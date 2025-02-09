// import productList from "./productList.mjs";

// productList(".product-list", "tents");

//import { updateCartCount } from "./utils.mjs";

import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

productList("#product-container", "tents-category");


// Call the updateCartCount function 
updateCartCount();