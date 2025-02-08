import { setLocalStorage, getLocalStorage, animateCartIcon, updateCartCount} from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { qs, setContent } from "./utils.mjs";

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
  // set image src
  qs("#productImage").setAttribute("src", product.Image);
  // handle add to cart
  qs("#addToCart").addEventListener(
    "click",
    addProductToCart.bind(null, product)
  );
}