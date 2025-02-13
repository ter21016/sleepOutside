// import productList from "./productList.mjs";

// productList(".product-list", "tents");

//import { updateCartCount } from "./utils.mjs";

import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

productList("#product-container", "tents-category");


// Call the updateCartCount function 
updateCartCount();

// document.addEventListener("DOMContentLoaded", () => {
//     const category = getParam("category");
  
//     if (category) {
//       const categoryTitle = document.getElementById("category-title");
//       categoryTitle.textContent = `Top Products: ${capitalizeFirstLetter(category)}`;
//     }
//   });
  
//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }