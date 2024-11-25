document.addEventListener('DOMContentLoaded', function () {
    // Function to retrieve stored products from localStorage
    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    // Function to display the products in the Seller Dashboard
    function displayProducts() {
        const products = getProducts();
        const productList = document.getElementById('product-list');

        productList.innerHTML = ''; // Clear current list

        // Check if there are products and handle accordingly
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

    // Load products and display them when the page loads
    displayProducts();
});