import { getLocalStorage, loadHeaderFooter, loadNavigation, darkMode, setLocalStorage } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const darkModeList = ["#msg"];
darkMode(darkModeList);

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}