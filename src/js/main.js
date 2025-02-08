// import productList from "./productList.mjs";

// productList(".product-list", "tents");

import { updateCartCount } from "./utils.mjs";

import productList from "./productList.mjs";

productList("#product-container", "tents-category");



// Call the updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);