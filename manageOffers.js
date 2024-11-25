document.addEventListener("DOMContentLoaded", function () {

  // Predefined offers (replace "images/default-offer.png" with the actual image path for your initial offers)
  const offers = [
    { id: "offer1", name: "Best Discount", description: "Selected items now available with 50% off", photo: "images/image5.png" },
    { id: "offer2", name: "spacial 50% off", description: "Take advantage of discounts of up to 50% just for you<br> and receive many other attractive prizes", photo: "images/image6.png" },
    { id: "offer3", name: "Best Discount on Potato Chip", description: "Get 50% off on a variety of crispy and delicious Potato Chips!", photo: "images/image4.png" }
  ];

  const offersContainer = document.querySelector(".offers-container");
  const deleteButton = document.querySelector(".deletButton");

  // Render initial offers
  function renderOffers() {
    offersContainer.innerHTML = '';  // Clear existing offers (if any)

    offers.forEach(offer => {
      const offerDiv = document.createElement("div");
      offerDiv.classList.add("offer");

      offerDiv.innerHTML = `
        <input type="checkbox" id="${offer.id}">
        <label for="${offer.id}">
          <h3>${offer.name}</h3>
          <img src="${offer.photo}" alt="Offer Image">  <!-- Display the offer image -->
          <p>${offer.description}</p>
        </label>
      `;

      offersContainer.appendChild(offerDiv);
    });
  }

  // Call renderOffers to display the predefined offers
  renderOffers();

  // Delete selected offers
  deleteButton.addEventListener("click", function () {
    const checkboxes = offersContainer.querySelectorAll('input[type="checkbox"]');
    const selectedOffers = [];

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedOffers.push(checkbox.id);  // Collect IDs of selected offers
      }
    });

    if (selectedOffers.length === 0) {
      alert("Please select at least one offer");
    } else {
      const confirmation = confirm("Are you sure you want to delete the selected offers?");
      if (confirmation) {
        // Delete selected offers
        selectedOffers.forEach(function (offerId) {
          const offerElement = document.getElementById(offerId).parentElement;
          offerElement.remove();
        });
      }
    }
  });

  // Add new offer via form
  const addOfferForm = document.getElementById("addOfferForm");
  const addButton = document.querySelector(".ADDButton");

  addButton.addEventListener("click", function () {
    // Get input values
    const productName = document.getElementById("productName").value.trim();
    const description = document.getElementById("description").value.trim();
    const photo = document.getElementById("photo").files[0];

    // Validate the inputs

    // Validate product name (must only contain letters and spaces)
    const productNameRegex = /^[a-zA-Z\s]+$/;
    if (!productName.match(productNameRegex)) {
      alert("Product name should only contain letters and spaces.");
      return; // If product name is invalid, stop
    }

    // Validate description (must be at least 10 characters long)
    if (description.length < 10) {
      alert("Description should be at least 10 characters long.");
      return; // If description is invalid, stop
    }

    // Validate if the uploaded file is an image
    if (!photo || !photo.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return; // If the file is not an image, stop
    }

    // Create a new offer object
    const newOffer = {
      id: `offer${Date.now()}`, // Unique ID based on timestamp
      name: productName,
      description: description,
      photo: URL.createObjectURL(photo) // Create a URL for the uploaded image
    };

    // Add the new offer to the offers array
    offers.push(newOffer);

    // Add the new offer to the DOM
    const offerDiv = document.createElement("div");
    offerDiv.classList.add("offer");

    offerDiv.innerHTML = `
      <input type="checkbox" id="${newOffer.id}">
      <label for="${newOffer.id}">
        <h3>${newOffer.name}</h3>
        <img src="${newOffer.photo}" alt="Special Offer Image">  <!-- Correctly show the uploaded image -->
        <p>${newOffer.description}</p>
      </label>
    `;

    // Append the new offer to the container
    offersContainer.appendChild(offerDiv);

    // Reset the form after adding the offer
    addOfferForm.reset();
  });
});



