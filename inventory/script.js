// Initialize arrays with dummy data
let inventory = [
    { name: 'Apples', quantity: 7, supplier: 'Supplier A', totalResource:10 },
    { name: 'Bananas', quantity: 3, supplier: 'Supplier B', totalResource:100 },  
    { name: 'Oranges', quantity: 5, supplier: 'Supplier C', totalResource:5 },
    { name: 'Grapes', quantity: 8, supplier: 'Supplier A', totalResource:8 },
];

let suppliers = ['Supplier A', 'Supplier B', 'Supplier C'];
 

// Function to render inventory list
function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the list before rendering

      

    inventory.forEach(item => {
        const card = document.createElement('div');
        card.className = 'progress-card';

        // Set the fill amount for the progress circle based on the item quantity
        const radius = 40; // Radius of the circle
        const circumference = 2 * Math.PI * radius; // Calculate circumference
        const fillAmount = ((item.quantity/item.totalResource) * circumference).toFixed(2); // Calculate fill amount
         
        // Card content with progress indicator and item details
        card.innerHTML = `
            <h2>${item.name}</h2>
            <div class="progress-circle">
                <svg width="100" height="100">
                    <circle class="circle-bg" cx="50" cy="50" r="${radius}" style="stroke-dasharray: ${circumference}; stroke-dashoffset: 0;"></circle>
                    <circle class="circle-fill" cx="50" cy="50" r="${radius}" style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference - fillAmount};"></circle>
                </svg>
                <div class="percentage">
                    <h3>${Math.round((item.quantity/item.totalResource)*100)}%</h3>
                </div>
            </div>
            <div class="details">
                <p class="quantity">Quantity: ${item.quantity}</p>
                <p class="supplier">Supplier: ${item.supplier}</p>
            </div>
        `;

        // Highlight low stock items
        if ((item.quantity/item.totalResource)*100 > 90) { // Assume 5 is the low stock threshold
            card.classList.add('low-stock');
        }

        inventoryList.appendChild(card);
    });
}


// Function to render supplier list
function renderSuppliers() {
    const supplierList = document.getElementById('supplier-list');
    supplierList.innerHTML = ''; // Clear the list before rendering
    suppliers.forEach((supplier, index) => {
        const li = document.createElement('li');
        li.className = 'supplier-item';
        li.textContent = supplier;

        // Button to remove supplier
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-supplier';
        removeButton.onclick = () => removeSupplier(index); // Pass the index to remove supplier

        li.appendChild(removeButton);
        supplierList.appendChild(li);
    });
}

// Function to remove a supplier
function removeSupplier(index) {
    suppliers.splice(index, 1);
    
    // Remove any inventory items associated with this supplier
    inventory = inventory.filter(item => item.supplier !== suppliers[index]);
    
    renderSuppliers();
    renderInventory();
}

// Event listener for inventory form submission
document.getElementById('inventory-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const itemSupplier = document.getElementById('item-supplier').value;

    // Add the new item to inventory array
    inventory.push({ name: itemName, quantity: itemQuantity, supplier: itemSupplier });

    // Clear the input fields
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-supplier').value = '';

    // Render the updated inventory list
    renderInventory();
});

// Event listener for supplier form submission
document.getElementById('supplier-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
    const supplierName = prompt("Enter the Supplier name");

     if(supplierName)
     {

         suppliers.push(supplierName);
         renderSuppliers();
     }
});
 

// Function to populate the supplier select element
function populateSupplierOptions() {
    const supplierSelect = document.getElementById('item-supplier');
    supplierSelect.innerHTML = '<option value="" disabled selected>Select Supplier</option>'; // Reset options

    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier; // Set the value of the option
        option.textContent = supplier; // Set the display text
        supplierSelect.appendChild(option); // Add the option to the select
    });
}

// Call the function to populate the options when the page loads
populateSupplierOptions();
// Render the lists on page load
renderInventory();
renderSuppliers();
