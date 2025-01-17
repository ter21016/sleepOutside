import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";



function addProductToCart(product) {
  setLocalStorage("so-cart", product);
  //retrieve localstorage array. If not, set a vid array.
  const cartArr = getLocalStorage("So-cart") || [];

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

