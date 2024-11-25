//Product Evaluation Page 

let selectedRating = 0;

// Function to handle star rating selection
function selectRating(rating) {

    const stars = document.querySelectorAll(".star");
    if (stars.length === 0) 
        return; 

    selectedRating = rating;
    for (let i = 0; i < stars.length; i++) {
        stars[i].textContent = i < selectedRating ? "★" : "☆"; // Fill stars up to the selected rating
    }
}


// Function to handle form submission
function submitFeedback() {
    // Check if the form elements exist
    const orderElement = document.getElementById("order");
    const productElement = document.getElementById("product");

    if (!orderElement || !productElement) return false; // Exit if form elements are not found

    const order = orderElement.value;
    const product = productElement.value;

    if (!order) {
        alert("Please select an order!");
        return false; // Prevent form submission
    }

    if (!product) {
        alert("Please select a product!");
        return false; // Prevent form submission
    }

    if (selectedRating === 0) {
        alert("Please select a rating!");
        return false; // Prevent form submission
    }

    alert(`Thank you for your feedback!\nYour rating for product \"${product.toUpperCase()}\" is ${selectedRating} star(s).`);
    window.location.href = "index.html"; // Redirect to homepage
    return false; // Prevent form submission
}

