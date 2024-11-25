function getWeekStartDate() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = currentDate.getDate() - currentDay;
    const weekStartDate = new Date(currentDate.setDate(diff));

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = weekStartDate.toLocaleDateString('en-US', options);

    // Set the text content
    document.getElementById('week-start-date').textContent = `Week starts on: ${formattedDate}`;
}

function toggleTheme() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const cartIcon = document.getElementById('cart-icon');
    const sellerIcon = document.getElementById('seller-icon');
    const userIcon = document.getElementById('user-icon');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn'); 
    const visionImage = document.querySelector('.vision-image'); 

    // Toggle dark theme
    body.classList.toggle('dark-theme');


    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'Light Mood'; 
    } else {
        themeToggleBtn.textContent = 'Dark Mood'; 
    }


    if (body.classList.contains('dark-theme')) {
        logo.src = 'images/darklogo.png';      
        cartIcon.src = 'images/darkcart.png';   
        sellerIcon.src = 'images/userdark.png'; 
        userIcon.src = 'images/userdark.png';  
        visionImage.src = 'images/darkWIDE.png'; 
    } else {
        logo.src = 'images/wide-logo.png';    
        cartIcon.src = 'images/cart.png';      
        sellerIcon.src = 'images/user.png';     
        userIcon.src = 'images/user.png';  
        visionImage.src = 'images/WIDE.png';     
    }
}
window.onload = function() {
    getWeekStartDate();
};
function showMoreOffers() {
    // Get all the hidden offers
    const moreOffers = document.querySelectorAll('.more-offer');
    
    // Toggle visibility
    moreOffers.forEach(offer => {
        offer.style.display = offer.style.display === 'none' || offer.style.display === '' ? 'block' : 'none';
    });

    // Change button text after clicking
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn.textContent === 'More') {
        showMoreBtn.textContent = 'Less';  // Change to 'Less' 
    } else {
        showMoreBtn.textContent = 'More';  // Change back to 'More'
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const reviews = document.querySelectorAll(".review");
    const hoverInfo = document.getElementById("hover-info");
  
    reviews.forEach(review => {
      review.addEventListener("mouseover", event => {
        const customer = review.dataset.customer;
        const product = review.dataset.product;
        const rate = review.dataset.rate;
        const feedback = review.dataset.feedback;
  
        document.getElementById("customer-name").textContent = customer;
        document.getElementById("product-name").textContent = product;
        document.getElementById("product-rate").textContent = rate;
        document.getElementById("product-feedback").textContent = feedback;
  
        hoverInfo.style.display = "block";
        hoverInfo.style.top = `${event.pageY + 10}px`;
        hoverInfo.style.left = `${event.pageX + 10}px`;
      });
  
      review.addEventListener("mousemove", event => {
        hoverInfo.style.top = `${event.pageY + 10}px`;
        hoverInfo.style.left = `${event.pageX + 10}px`;
      });
  
      review.addEventListener("mouseout", () => {
        hoverInfo.style.display = "none";
      });
    });
  });
