import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

// eslint-disable-next-line no-unused-vars
document.querySelector("#loginButton").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({ email, password }, redirect);
  });