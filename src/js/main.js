import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

productList("#product-container", "tents");

// Call the updateCartCount function
updateCartCount();
