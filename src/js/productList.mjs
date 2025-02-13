import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Tent IDs that we need to display
const REQUIRED_TENT_IDS = ["880RR", "985RF", "985PR", "344YJ"];

// Filter products to only include required tent IDs
function filterTents(products) {
  return products.filter(product => REQUIRED_TENT_IDS.includes(product.Id));
}

// Template for each product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

// Fetch, filter, and render the list of products
export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  let products = await getData(category); 
  products = filterTents(products);      
  renderListWithTemplate(productCardTemplate, el, products); 
}
