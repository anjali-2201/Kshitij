class DonorManager {
    constructor() {
        this.donors = JSON.parse(localStorage.getItem('kshitij_donors')) || [];
        this.renderDonorsList();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('add-donor-btn')?.addEventListener('click', () => {
            document.getElementById('add-donor-modal').classList.remove('hidden');
        });

        document.getElementById('close-donor-modal')?.addEventListener('click', () => {
            document.getElementById('add-donor-modal').classList.add('hidden');
        });

        document.getElementById('add-donor-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const donor = {
                id: Date.now(),
                name: form[0].value,
                email: form[1].value,
                totalDonation: parseFloat(form[2].value) || 0,
                donationHistory: []
            };

            this.addDonor(donor);
            form.reset();
            document.getElementById('add-donor-modal').classList.add('hidden');
        });
    }

    addDonor(donor) {
        this.donors.push(donor);
        this.saveDonors();
        this.renderDonorsList();
    }

    renderDonorsList() {
        const donorsList = document.getElementById('donors-list');
        donorsList.innerHTML = '';

        this.donors.forEach(donor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${donor.name}</td>
                <td class="p-3">${donor.email}</td>
                <td class="p-3">₹${donor.totalDonation.toLocaleString()}</td>
                <td class="p-3">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
            `;
            donorsList.appendChild(row);
        });
    }

    saveDonors() {
        localStorage.setItem('kshitij_donors', JSON.stringify(this.donors));
    }
}

// Initialize Donor Manager
const donorManager = new DonorManager();