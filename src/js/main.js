// import productList from "./productList.mjs";

// productList(".product-list", "tents");

import { getCartItems } from "./utils.mjs";

import productList from "./productList.mjs";

productList("#product-container", "tents-category");

// Function to get the number of items in the cart
function getCartItemCount() {
    const cartItems = getCartItems();
    return cartItems.length;
}

// Function to update the cart count
export function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    const itemCount = getCartItemCount();
    cartCountElement.textContent = itemCount;
}

// Call the updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);