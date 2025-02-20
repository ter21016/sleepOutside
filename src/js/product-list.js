import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

productList(".product-list", category);

//added product-search

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("product-search");
    const productListElement = document.querySelector(".product-list"); // Renamed variable
  
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
      filterProducts(query);
    });
  
    function filterProducts(query) {
      const products = Array.from(productListElement.children); // Updated variable name
      products.forEach(product => {
        const productName = product.textContent.toLowerCase();
        if (productName.includes(query)) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    }
  });
  


// Call the updateCartCount function 
updateCartCount();