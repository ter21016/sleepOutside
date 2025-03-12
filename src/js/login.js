import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { showWelcomeModal } from "./welcomeModal.js";

loadHeaderFooter();
const redirect = getParam("redirect") || "/";

showWelcomeModal(); 

document.querySelector("#login").addEventListener("click", () => {
  event.preventDefault(); // This prevents the form from submitting
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect);
});
