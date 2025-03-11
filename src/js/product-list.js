import productList from "./productList.mjs";
import {
  loadHeaderFooter,
  updateCartCount,
  getParam,
  updateBreadcrumb,
} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

// Load products and update breadcrumb
productList(".product-list", category)
  .then((products) => {
    if (!products || !Array.isArray(products)) {
      throw new Error("Invalid product data received");
    }

    updateCartCount();
    updateBreadcrumb(category, "", products.length); // Ensure products is valid
  })
  .catch((error) => {
    updateBreadcrumb(category, "", 0); // Show breadcrumb with 0 items
  });

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("product-search");
  const productListElement = document.querySelector(".product-list");

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    filterProducts(query);
  });

  function filterProducts(query) {
    const products = Array.from(productListElement.children);
    products.forEach((product) => {
      const productName = product.textContent.toLowerCase();
      product.style.display = productName.includes(query) ? "" : "none";
    });
  }
});
