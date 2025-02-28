import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

// Fixed selector to match the actual product list container
productList(".product-list", "tents").then(() => {
  updateCartCount(); // Ensures cart count updates after rendering
});
