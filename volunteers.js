document.addEventListener('DOMContentLoaded', function() {
    // Initialize Calendar
    var calendarEl = document.getElementById('volunteer-calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Sample events, will be dynamically populated
            {
                title: 'Tree Plantation Drive',
                start: '2024-03-15',
                end: '2024-03-16'
            },
            {
                title: 'Community Cleaning',
                start: '2024-03-22'
            }
        ]
    });
    calendar.render();

    // Task Form Handling
    const taskForm = document.getElementById('add-task-form');
    taskForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskData = {
            title: taskForm[0].value,
            date: taskForm[1].value,
            volunteer: taskForm[2].value,
            description: taskForm[3].value
        };

        // In a real app, this would be sent to a backend
        console.log('New Task:', taskData);
        
        // Add event to calendar
        calendar.addEvent({
            title: taskData.title,
            start: taskData.date
        });

        taskForm.reset();
    });
});

class VolunteerManager {
    constructor() {
        this.volunteers = [];
        this.tasks = [];
    }

    addVolunteer(volunteer) {
        this.volunteers.push(volunteer);
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getVolunteerTasks(volunteerId) {
        return this.tasks.filter(task => task.volunteerId === volunteerId);
    }
}