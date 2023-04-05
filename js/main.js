import { getLocalStorage, loadHeaderFooter, loadNavigation, darkMode, setLocalStorage } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}