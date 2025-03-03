import { setLocalStorage, getLocalStorage, animateCartIcon, qs, setContent, updateCartCount} from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

function addProductToCart(product) {
  const currentCart = getLocalStorage("so-cart") || [];
  
  // Check if the product is already in the cart
  const existingProductIndex = currentCart.findIndex(
    (item) => item.Id === product.Id
  );

  if (existingProductIndex !== -1) {
    // Product exists in the cart, increment its quantity
    currentCart[existingProductIndex].quantity = (currentCart[existingProductIndex].quantity || 1) + 1;
  } else {
    // Product does not exist in the cart, add it with a default quantity of 1
    product.quantity = 1;
    currentCart.push(product);
  }

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", currentCart);

  // Trigger cart icon animation and update cart count
  animateCartIcon();
  updateCartCount();
}

export default async function productDetails(productId) {
  try {
    const product = await findProductById(productId);
    renderProductDetails(product);
  } catch (error) {
    displayErrorMessage("The requested product does not exist.");
  }
}

function displayErrorMessage(message) {
  const productDetailContainer = document.querySelector(".product-detail");
  if (productDetailContainer) {
    productDetailContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
        <p><a href=/><< Back to home</a></p>
      </div>
    `;
  }
}

function renderProductDetails(product) {
  // set basic content
  setContent("#productName", product.Brand.Name);
  setContent("#productNameWithoutBrand", product.NameWithoutBrand);
  setContent("#productFinalPrice", product.FinalPrice);
  setContent("#productDescriptionHtmlSimple", product.DescriptionHtmlSimple);

  // Calculate and display the discounted price if a discount is available
  if (product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercentage = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;
    const discountedPrice = product.SuggestedRetailPrice - product.FinalPrice;
    setContent("#productDiscountedPrice", `$${discountedPrice.toFixed(2)} (${discountPercentage.toFixed(0)}% off)`);
    qs("#productDiscount").classList.remove("hide");

    // Add discount flag
    const discountFlag = document.createElement("div");
    discountFlag.classList.add("discount-flag");
    discountFlag.innerText = `${discountPercentage.toFixed(0)}% OFF`;

    qs(".product-detail").appendChild(discountFlag);
  } else {
    qs("#productDiscount").classList.add("hide");
  }

  // set image src
  qs("#productImage").setAttribute("src", product.Images.PrimaryLarge);
  // handle add to cart
  qs("#addToCart").addEventListener(
    "click",
    addProductToCart.bind(null, product)
  );
}