import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  //document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const cartList = document.querySelector(".product-list");

  if (cartItems && cartItems.length > 0) {
    cartItems.forEach(item => {
      cartList.innerHTML += cartItemTemplate(item);
    });
  }
}

function updateCartFooter() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    // Show the cart-footer element
    document.querySelector(".cart-footer").classList.remove("hide");

    // Calculate the total price
    const totalPrice = cartItems.reduce((total, item) => total + item.FinalPrice, 0);

    // Update the total price in the cart-footer element
    document.querySelector(".cart-total").textContent = `Total: $${totalPrice.toFixed(2)}`;
  } else {
    // Hide the cart-footer element if the cart is empty
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

//renderCartContents();

// Call the functions to render cart contents and update the cart footer when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  updateCartFooter();
});
