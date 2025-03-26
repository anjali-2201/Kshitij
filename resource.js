class ResourceManager {
    constructor() {
        this.resources = JSON.parse(localStorage.getItem('kshitij_resources')) || [];
        this.renderResourcesList();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const resourceForm = document.getElementById('add-resource-form');
        resourceForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const resource = {
                id: Date.now(),
                name: resourceForm[0].value,
                quantity: parseInt(resourceForm[1].value),
                status: resourceForm[2].value
            };

            this.addResource(resource);
            resourceForm.reset();
        });
    }

    addResource(resource) {
        this.resources.push(resource);
        this.saveResources();
        this.renderResourcesList();
    }

    renderResourcesList() {
        const resourcesList = document.getElementById('resources-list');
        resourcesList.innerHTML = '';

        this.resources.forEach(resource => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${resource.name}</td>
                <td class="p-3">${resource.quantity}</td>
                <td class="p-3">${resource.status}</td>
                <td class="p-3">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
            `;
            resourcesList.appendChild(row);
        });
    }

    saveResources() {
        localStorage.setItem('kshitij_resources', JSON.stringify(this.resources));
    }
}

// Initialize Resource Manager
const resourceManager = new ResourceManager();