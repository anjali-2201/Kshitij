class EventManager {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('kshitij_events')) || [];
        this.calendar = null;
        this.initializeCalendar();
        this.setupEventListeners();
        this.renderUpcomingEvents();
    }

    initializeCalendar() {
        const calendarEl = document.getElementById('calendar');
        this.calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: this.events.map(this.convertToCalendarEvent),
            eventClick: this.handleEventClick.bind(this)
        });
        this.calendar.render();
    }

    setupEventListeners() {
        // Add Event Modal Interactions
        const addEventBtn = document.getElementById('add-event-btn');
        const addEventModal = document.getElementById('add-event-modal');
        const closeModalBtn = document.getElementById('close-event-modal');
        const addEventForm = document.getElementById('add-event-form');

        addEventBtn?.addEventListener('click', () => {
            addEventModal.classList.remove('hidden');
        });

        closeModalBtn?.addEventListener('click', () => {
            addEventModal.classList.add('hidden');
        });

        addEventForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formElements = e.target.elements;
            
            const newEvent = {
                id: Date.now().toString(),
                title: formElements[0].value,
                start: formElements[1].value,
                end: formElements[2].value || formElements[1].value,
                type: formElements[3].value,
                volunteers: Array.from(formElements[4].selectedOptions).map(opt => opt.value),
                description: formElements[5].value
            };

            this.addEvent(newEvent);
            addEventModal.classList.add('hidden');
            e.target.reset();
        });
    }

    addEvent(event) {
        this.events.push(event);
        this.saveEvents();
        this.calendar.addEvent(this.convertToCalendarEvent(event));
        this.renderUpcomingEvents();
    }

    convertToCalendarEvent(event) {
        return {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: false
        };
    }

    handleEventClick(info) {
        const event = this.events.find(e => e.id === info.event.id);
        if (event) {
            // Create a detailed view or modal to show event details
            alert(`Event: ${event.title}\nType: ${event.type}\nDescription: ${event.description}`);
        }
    }

    renderUpcomingEvents() {
        const upcomingEventsList = document.getElementById('upcoming-events-list');
        upcomingEventsList.innerHTML = '';

        // Sort events by date and take next 5 upcoming events
        const sortedEvents = this.events
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .slice(0, 5);

        sortedEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('bg-gray-100', 'p-4', 'rounded-lg');
            eventElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-semibold text-lg">${event.title}</h3>
                        <p class="text-gray-600 text-sm">
                            ${new Date(event.start).toLocaleDateString()} 
                            | ${event.type}
                        </p>
                    </div>
                    <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Upcoming
                    </span>
                </div>
            `;
            upcomingEventsList.appendChild(eventElement);
        });
    }

    saveEvents() {
        localStorage.setItem('kshitij_events', JSON.stringify(this.events));
    }
}

// Initialize Event Manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const eventManager = new EventManager();
});