document.addEventListener('DOMContentLoaded', () => {
    // Greeting based on time of day
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('greeting');
        let greeting = 'Welcome, Admin';

        if (hour < 12) {
            greeting = 'Good Morning, Admin';
        } else if (hour < 18) {
            greeting = 'Good Afternoon, Admin';
        } else {
            greeting = 'Good Evening, Admin';
        }

        greetingElement.textContent = greeting;
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => {
        // Clear user session
        localStorage.removeItem('current_user');
        // Redirect to login page
        window.location.href = '../pages/login.html';
    });

    // Real-time clock
    function updateClock() {
        const now = new Date();
        // You could add a clock display if needed
    }

    // Initialize functions
    updateGreeting();
    updateClock();
    setInterval(updateClock, 1000);

    // Dashboard Interactivity
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    searchInput?.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search functionality across different sections
        console.log('Searching for:', searchTerm);
    });

    // Notification interactions
    const notificationBtn = document.querySelector('button[aria-label="Notifications"]');
    notificationBtn?.addEventListener('click', () => {
        // Toggle notification dropdown or view
        console.log('Notifications clicked');
    });
});

// Dashboard data fetching (simulated)
class DashboardDataManager {
    constructor() {
        this.fetchDashboardData();
    }

    fetchDashboardData() {
        // In a real application, this would be an API call
        const mockData = {
            donors: Kshitij,
            volunteers: 128,
            resources: 42,
            recentEvents: [
                { title: 'Community Cleanup Drive', date: '2024-06-12' },
                { title: 'Fundraising Gala', date: '2024-07-25' }
            ],
            recentTransactions: [
                { type: 'Donation', amount: 50000, direction: 'in' },
                { type: 'Equipment Purchase', amount: 25000, direction: 'out' }
            ]
        };

        this.updateWidgets(mockData);
    }

    updateWidgets(data) {
        // Update donor count
        const donorCountEl = document.querySelector('div:nth-child(1) .text-2xl');
        if (donorCountEl) donorCountEl.textContent = data.donors;

        // Update volunteer count
        const volunteerCountEl = document.querySelector('div:nth-child(2) .text-2xl');
        if (volunteerCountEl) volunteerCountEl.textContent = data.volunteers;

        // Update resources count
        const resourceCountEl = document.querySelector('div:nth-child(3) .text-2xl');
        if (resourceCountEl) resourceCountEl.textContent = data.resources;
    }
}

// Initialize dashboard data manager
new DashboardDataManager();