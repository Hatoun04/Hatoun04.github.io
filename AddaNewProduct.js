document.addEventListener('DOMContentLoaded', function() {
    // Clear localStorage every time the page is refreshed.
    localStorage.clear();

    // Function to retrieve stored products from localStorage
    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    // Function to display the products in the Seller Dashboard
    function displayProducts() {
        const products = getProducts();
        const productList = document.getElementById('product-list');

        productList.innerHTML = ''; // Clear current list

        // Check if there are products
        if (products.length === 0) {
            productList.innerHTML = '<li>No products added yet.</li>';
        } else {
            products.forEach(product => {
                const productItem = document.createElement('li');
                productItem.innerHTML = `
                    <div class="offerr">
                        <h3>${product.name}</h3>
                        <img src="${product.photo}" alt="${product.name}" />
                        <p>${product.description}</p>
                        <p>Quantity: ${product.quantity}</p>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <p>Category: ${product.category}</p>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        }
    }

    // Handle the "Add product" button click
    document.querySelector('.adderButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const form = document.querySelector('form'); // Grab the form
        const category = document.querySelector('input[name="category"]:checked');
        const productName = document.getElementById('productName').value.trim();
        const description = document.getElementById('description').value.trim();
        const quantity = parseInt(document.getElementById('quantity').value.trim());
        const price = parseFloat(document.getElementById('price').value.trim());
        const photoFile = document.getElementById('photo').files[0]; // Get uploaded photo file

        // Validation
        let validationMessage = '';
        if (!category) validationMessage += 'Please select a category.\n';
        if (!productName) validationMessage += 'Product Name is required.\n';
        if (/\d/.test(productName)) validationMessage += 'Product Name cannot include numbers.\n'; // Check if name includes numbers
        if (!quantity || isNaN(quantity) || quantity <= 0) validationMessage += 'Quantity must be a positive number.\n';
        if (!price || isNaN(price) || price <= 0) validationMessage += 'Price must be a valid number.\n';
        if (!photoFile) validationMessage += 'Please upload a product photo.\n';

        if (validationMessage) {
            alert(validationMessage); // Display validation errors
            return; // Stop processing if there are validation errors
        }

        // Read the photo file as a Base64 string
        const reader = new FileReader();
        reader.onloadend = function() {
            // Create product object after the photo is read
            const newProduct = {
                category: category.value,
                name: productName,
                description: description,
                quantity: quantity,
                price: price,
                photo: reader.result, // Use the Base64 string
            };

            // Save product to local storage
            const products = getProducts(); // Retrieve existing products
            products.push(newProduct); // Add the new product to the array
            localStorage.setItem('products', JSON.stringify(products)); // Store the updated array

            // Show success message
            alert(`Product "${newProduct.name}" added successfully!`);

            // Clear the form
            form.reset(); // Reset the form
            document.querySelectorAll('input[name="category"]').forEach(input => input.checked = false); // Uncheck category

            // Update the Seller Dashboard with new products
            displayProducts();
        };

        // Start reading the file as a Data URL (Base64)
        reader.readAsDataURL(photoFile);
    });

    // Display products when the page loads
    displayProducts();
});