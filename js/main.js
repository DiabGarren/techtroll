import { getLocalStorage, loadHeaderFooter, loadNavigation, darkMode, setLocalStorage, showTopBtn } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));
window.addEventListener("scroll", () => {
    showTopBtn(document.querySelector(".topBtn"));
})

const cart = getLocalStorage("cart");
if (!cart) {
    setLocalStorage("cart", []);
}