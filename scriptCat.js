document.addEventListener("DOMContentLoaded", function() {
    // Sorting functionality
    const sortSelect = document.getElementById("sorting");
    const productContainer = document.getElementById("picCategories");
    

    if (sortSelect && productContainer) {
        sortSelect.addEventListener("change", function() {
            const sortType = sortSelect.value;
            const products = Array.from(productContainer.getElementsByClassName("categoriesOption"));

            if (sortType === "a-z") {
                products.sort((a, b) => 
                    a.getElementsByTagName("h4")[0].textContent.localeCompare(b.getElementsByTagName("h4")[0].textContent)
                );
            } else if (sortType === "z-a") {
                products.sort((a, b) => 
                    b.getElementsByTagName("h4")[0].textContent.localeCompare(a.getElementsByTagName("h4")[0].textContent)
                );
            } else if (sortType === "low to high") {
                products.sort((a, b) => 
                    parseFloat(a.getElementsByClassName("priceCat")[0].textContent.replace("SAR ", "")) - 
                    parseFloat(b.getElementsByClassName("priceCat")[0].textContent.replace("SAR ", ""))
                );
            } else if (sortType === "high to low") {
                products.sort((a, b) => 
                    parseFloat(b.getElementsByClassName("priceCat")[0].textContent.replace("SAR ", "")) - 
                    parseFloat(a.getElementsByClassName("priceCat")[0].textContent.replace("SAR ", ""))
                );
            }

            // Reorder products in the container
            productContainer.innerHTML = "";
            products.forEach(product => productContainer.appendChild(product));
        });
    }


        // Cart functionality

        const myCartButton = document.getElementById("myCartButton");
        const products = Array.from(productContainer.getElementsByClassName("categoriesOption"));
    
        // Add to Cart button functionality
        products.forEach(product => {
            const addToCartBtn = product.getElementsByClassName("add-to-cart-btn")[0];
            const plusBtn = product.getElementsByClassName("plus-btn")[0];
            const minusBtn = product.getElementsByClassName("minus-btn")[0];
            const quantityDisplay = product.getElementsByClassName("quantity")[0];
            let quantity = parseInt(quantityDisplay.textContent) || 1;
    
            // Update quantity when + or - buttons are clicked
            plusBtn.addEventListener("click", () => {
                quantity++;
                quantityDisplay.textContent = quantity;
            });
    
            minusBtn.addEventListener("click", () => {
                if (quantity > 1) {
                    quantity--;
                    quantityDisplay.textContent = quantity;
                }
            });
    
            // Handle Add to Cart button click
            addToCartBtn.addEventListener("click", () => {
                const productName = product.getElementsByTagName("h4")[0].textContent;
                const productPrice = parseFloat(product.getElementsByClassName("priceCat")[0].textContent.replace("SAR ", ""));
    
                // Retrieve existing cart items
                const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
                // Check if the product already exists in the cart
                const existingItem = existingCartItems.find(item => item.name === productName);
                if (existingItem) {
                    // Update quantity if the item exists
                    existingItem.quantity += quantity;
                } else {
                    // Add new item to the cart
                    existingCartItems.push({
                        name: productName,
                        price: productPrice,
                        quantity: quantity
                    });
                }
    
                // Save updated cart to local storage
                localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    
                // Reset quantity to 1 after adding to the cart
                quantity = 1;
                quantityDisplay.textContent = quantity;
    
                alert(`${productName} added to your cart!`);
            });
        });
    
        // My Cart button functionality
        myCartButton.addEventListener("click", () => {
            // Retrieve the existing cart items stored by the "Add to Cart" button
            const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
            if (existingCartItems.length === 0) {
                alert("Your cart is empty. Add items to the cart before viewing!");
                return;
            }
    
            // Redirect to the cart page
            window.location.href = "cart.html";
        });
    
    
});

