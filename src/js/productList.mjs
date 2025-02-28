import { getProductByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Template for each product card
function productCardTemplate(product) {
  if (!product || !product.Brand || !product.NameWithoutBrand) return "";

  const discountPercentage = product.ListPrice
    ? Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100)
    : 0;

  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images?.PrimaryMedium || "placeholder.jpg"}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      <p class="product-card__original-price">$${product.ListPrice?.toFixed(2) || ""}</p>
      <span class="discount-badge">${discountPercentage}% OFF</span>
    </a>
  </li>`;
}

// Sorting function
function sortProducts(products, sortBy) {
  if (!Array.isArray(products)) return [];

  return products.slice().sort((a, b) => {
    if (sortBy === "name") {
      return a.NameWithoutBrand.localeCompare(b.NameWithoutBrand);
    } else if (sortBy === "price") {
      return a.FinalPrice - b.FinalPrice;
    }
    return 0;
  });
}

// Fetch, sort, and render the list of products
export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  if (!el) {
    // console.error(`Selector "${selector}" not found.`); // Removed unexpected console statement
    return;
  }

  try {
    let products = await getProductByCategory(category);
    if (!products || !Array.isArray(products)) {
      // console.error("Error: Product list is undefined or not an array."); // Removed unexpected console statement
      return;
    }

    // Render sorting controls
    addSortingControls(selector, products, el);

    // Initial render
    renderListWithTemplate(productCardTemplate, el, products);
    document.querySelector(".title").textContent = category;
  } catch (error) {
    // console.error("Error loading products:", error); // Removed unexpected console statement
  }
}

// Function to add sorting dropdown
function addSortingControls(selector, products, el) {
  const sortControlsHTML = `
    <div class="sorting-controls">
      <label for="sort-by">Sort by:</label>
      <select id="sort-by">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  `;
  document.querySelector(selector).insertAdjacentHTML("beforebegin", sortControlsHTML);

  document.getElementById("sort-by").addEventListener("change", (e) => {
    const sortedProducts = sortProducts(products, e.target.value);
    el.innerHTML = ""; // Clear previous list
    renderListWithTemplate(productCardTemplate, el, sortedProducts); // Render sorted products
  });
}
