import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Template for each cart item
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="product_pages/${item.Id}.html" class="cart-card__image">
      <img src="${item.Image}" alt="Image of ${item.Name}" />
    </a>
    <a href="product_pages/${item.Id}.html">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Color}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Fetch, filter, and render the list of cart items
export function renderCartContents(selector) {
  const el = document.querySelector(selector);
  const cartItems = getLocalStorage("so-cart") || [];
  renderListWithTemplate(cartItemTemplate, el, cartItems);
}