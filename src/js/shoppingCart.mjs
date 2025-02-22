import {getLocalStorage, setLocalStorage, animateCartIcon, updateCartCount, renderListWithTemplate} from "./utils.mjs";

export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartList = document.querySelector('.product-list');
  
  animateCartIcon();
  updateCartCount();

  renderListWithTemplate(cartItemTemplate, cartList, cartItems);
  updateCartFooter(cartItems);

  attachEventHandlers();
}

function updateCartFooter(items) {
  const cartFooter = document.querySelector('.cart-footer');
  const total = items.reduce((sum, item) => sum + (item.FinalPrice || 0), 0);
  
  const totalElement = document.querySelector('.cart-total');
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (items.length > 0) {
    cartFooter.classList.remove('hide');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    
    if (!checkoutBtn) {
      cartFooter.insertAdjacentHTML('beforeend', '<button class="checkout-btn">Checkout</button>');
    }
  } else {
    cartFooter.classList.add('hide');
    checkoutBtn?.remove();
  }
}

function attachEventHandlers() {
  // Remove items
  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      removeCartItem(index);
    });
  });

  // Checkout
  document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    window.location.href = "../checkout/index.html";
  });
}

function removeCartItem(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimaryMedium || item.Image || ''}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ''}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${(item.FinalPrice || 0).toFixed(2)}</p>
    <button class="remove-item-btn" data-index="${index}">Remove</button>
  </li>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});