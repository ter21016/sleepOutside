import { setLocalStorage, getLocalStorage, animateCartIcon, qs, setContent, updateCartCount} from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

function addProductToCart(product) {
  const currentCart = getLocalStorage("so-cart") || [];
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);

  // Trigger cart icon animation
  animateCartIcon();
  updateCartCount();
}
export default async function productDetails(productId) {
  const product = await findProductById(productId);
  renderProductDetails(product);
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