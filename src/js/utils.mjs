
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

export function renderWithTemplate(
  templateFn, parentElement, data, callback, position = "afterbegin", clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  //const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, templateFn);
  if (callback) {
    callback(data);
  } 
}

export function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export function loadHeaderFooter() {
  const loadHeader = loadTemplate("/partials/header.html");
  const loadFooter = loadTemplate("/partials/footer.html");

  // load and render header
  loadHeader().then((html) => {
    const headerElement = qs("header");
    renderWithTemplate(html, headerElement, null, null, "afterbegin", true);
  });

  // load and render footer
  loadFooter().then((html) => {
    const footerElement = qs("footer");
    renderWithTemplate(html, footerElement, null, null, "beforeend", true);
  }); 
}
