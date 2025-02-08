
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function setContent(selector, content) {
  qs(selector).innerHTML = content;
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn, parentElement, list, position = "afterbegin", clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function animateCartIcon() {
  const cartIcon = qs(".cart svg");
  if (!cartIcon) return;

  // Add bounce class and remove after animation
  cartIcon.classList.add("cart-bounce-active");
  setTimeout(() => {
    cartIcon.classList.remove("cart-bounce-active");
  }, 500);
}

// Retrieve cart items from local storage
export function getCartItems() {
  return getLocalStorage("so-cart") || [];
}

// Function to get the number of items in the cart
function getCartItemCount() {
  const cartItems = getCartItems();
  return cartItems.length;
}

// Function to update the cart count
export function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const itemCount = getCartItemCount();
  cartCountElement.textContent = itemCount;
}