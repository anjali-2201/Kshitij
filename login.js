// auth.js - Authentication Logic for Kshitij NGO Portal

// User Roles
const ROLES = {
    ADMIN: 'admin',
    DONOR: 'donor',
    VOLUNTEER: 'volunteer'
};

class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('kshitij_users')) || [];
    }

    // User Registration
    register(email, password, name, role) {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now(),
            email,
            password: this.hashPassword(password),
            name,
            role,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    // User Login
    login(email, password) {
        const user = this.users.find(u => u.email === email);
        
        if (!user || !this.verifyPassword(user.password, password)) {
            throw new Error('Invalid credentials');
        }

        // Store logged-in user info
        localStorage.setItem('current_user', JSON.stringify(user));
        return user;
    }

    // Password Hashing (Simple implementation)
    hashPassword(password) {
        // Note: In a real app, use a secure hashing method
        return btoa(password);
    }

    verifyPassword(storedPassword, inputPassword) {
        return storedPassword === this.hashPassword(inputPassword);
    }

    // Save users to local storage
    saveUsers() {
        localStorage.setItem('kshitij_users', JSON.stringify(this.users));
    }

    // Get current logged-in user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('current_user'));
    }

    // Logout
    logout() {
        localStorage.removeItem('current_user');
        window.location.href = 'login.html';
    }

    // Role-based access control
    hasAccess(requiredRole) {
        const currentUser = this.getCurrentUser();
        return currentUser && (currentUser.role === requiredRole || currentUser.role === ROLES.ADMIN);
    }
}

// Initialize AuthManager
const authManager = new AuthManager();

// Login Form Handler
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const user = authManager.login(email, password);
        
        // Redirect based on role
        switch(user.role) {
            case ROLES.ADMIN:
                window.location.href = 'admin-panel.html';
                break;
            case ROLES.DONOR:
                window.location.href = 'donor-dashboard.html';
                break;
            case ROLES.VOLUNTEER:
                window.location.href = 'volunteer-dashboard.html';
                break;
            default:
                throw new Error('Invalid user role');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Export for use in other modules
export { authManager, ROLES };