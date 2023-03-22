import { getLocalStorage, loadHeaderFooter, loadNavigation, setLocalStorage } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}