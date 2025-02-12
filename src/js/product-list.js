import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

productList("#product-container", "tents-category");


// Call the updateCartCount function 
updateCartCount();