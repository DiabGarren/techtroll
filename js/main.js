import { getDarkMode, getLocalStorage, loadHeaderFooter, loadNavigation, setDarkMode, setLocalStorage } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}

const darkModeList = [".main-header", "main", "#msg"];
setDarkMode(darkModeList);
getDarkMode(darkModeList);