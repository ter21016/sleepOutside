import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  //setLocalStorage("so-cart", product);

  //retrieve localstorage array. If not, set a vid array.
  let cartArr = getLocalStorage("so-cart");

  // Ensure cartArr is an array
  if (!Array.isArray(cartArr)) {
    cartArr = [];
  }

  //push data to array.
  cartArr.push(product);

  // Set localStorage with modified array.
  setLocalStorage("so-cart", cartArr);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
