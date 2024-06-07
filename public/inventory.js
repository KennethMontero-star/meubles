document.addEventListener('DOMContentLoaded', () => {
    const inventoryForm = document.getElementById('inventory-form');
    const inventoryTableBody = document.getElementById('inventory-table-body');
    
    let inventory = [];

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = document.getElementById('itemQuantity').value;

        addItem(itemName, itemQuantity);
        inventoryForm.reset();
    });

    function addItem(name, quantity) {
        const item = { name, quantity: parseInt(quantity) };
        inventory.push(item);
        updateInventoryTable();
    }

    function updateItem(index, quantity) {
        inventory[index].quantity = parseInt(quantity);
        updateInventoryTable();
    }

    function deleteItem(index) {
        inventory.splice(index, 1);
        updateInventoryTable();
    }

    function updateInventoryTable() {
        inventoryTableBody.innerHTML = '';
        inventory.forEach((item, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;

            const actionsCell = document.createElement('td');

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('btn', 'btn-warning', 'btn-sm');
            updateButton.addEventListener('click', () => {
                const newQuantity = prompt('Enter new quantity:', item.quantity);
                if (newQuantity !== null) {
                    updateItem(index, newQuantity);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', () => deleteItem(index));

            actionsCell.appendChild(updateButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(actionsCell);

            inventoryTableBody.appendChild(row);
        });
    }
});
