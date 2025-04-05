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
    <button class="quick-view-button" data-product-id="${product.Id}">Quick View</button>
  </li>`;
}

// Function to show the modal with product details
function showModal(product) {
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-product-details");

  modalContent.innerHTML = `
    <h2>${product.NameWithoutBrand}</h2>
    <img src="${product.Images?.PrimaryMedium || "placeholder.jpg"}" alt="Image of ${product.Name}" />
    <p>Brand: ${product.Brand?.Name || "Unknown Brand"}</p>
    <p>Price: $${product.FinalPrice.toFixed(2)}</p>
    <p>Original Price: $${product.ListPrice?.toFixed(2) || ""}</p>
    <p>${product.Description}</p>
  `;

  modal.style.display = "block";

  // Close the modal when the close button is clicked
  document.querySelector(".close-button").onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
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

    // Add event listeners to the "Quick View" buttons
    document.querySelectorAll(".quick-view-button").forEach(button => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.getAttribute("data-product-id");
        const product = products.find(p => p.Id === productId);
        showModal(product);
      });
    });
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

    // Re-add event listeners to the "Quick View" buttons
    document.querySelectorAll(".quick-view-button").forEach(button => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.getAttribute("data-product-id");
        const product = products.find(p => p.Id === productId);
        showModal(product);
      });
    });
  });
}
