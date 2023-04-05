import { getLocalStorage, loadHeaderFooter, loadNavigation, darkMode, setLocalStorage } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
loadNavigation(document.querySelector(".main-nav"));

const darkModeList = ["#msg"];
darkMode(darkModeList);

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}