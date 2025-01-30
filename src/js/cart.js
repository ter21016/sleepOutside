import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartList = document.querySelector(".product-list");

  if (cartItems.length > 0) {
    // Build and set HTML in one go
    const htmlItems = cartItems
      .map((item, index) => cartItemTemplate(item, index))
      .join("");
    cartList.innerHTML = htmlItems;
  } else {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  }

  attachRemoveHandlers();
}

function attachRemoveHandlers() {
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      removeCartItem(index);
    });
  });
}

function removeCartItem(index) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the selected item
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  updateCartFooter();
}

function updateCartFooter() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");

    // Calculate and update total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );
    document.querySelector(
      ".cart-total"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item-btn" data-index="${index}">Remove</button>
  </li>`;
}

// Initialize cart rendering
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  updateCartFooter();
});
