import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

productList(".product-list", category).then(() => {
  updateCartCount(); // Ensures cart count updates after rendering
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
