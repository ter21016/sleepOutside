import { getProductByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Template for each product card
function productCardTemplate(product) {
  const discountPercentage = Math.round((product.ListPrice - product.FinalPrice) / product.ListPrice * 100);
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product-card__original-price">$${product.ListPrice}</p>
      <span class="discount-badge">${discountPercentage}% OFF</span>
    </a>
  </li>`;
}

// Fetch, filter, and render the list of products
export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  let products = await getProductByCategory(category); 
  //products = filterTents(products);      
  renderListWithTemplate(productCardTemplate, el, products); 
  document.querySelector(".title").innerHTML = category;
}
