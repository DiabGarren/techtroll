import Cart from "./ShoppingCart.mjs";
import { darkMode, loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";
import { removeItem } from "./ShoppingCart.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));

let cart = new Cart(".cart_wrapper");
cart.renderCart();

function removeItemHandler(event) {
    let removed = removeItem(event.target)
    if (removed) {
        cart.renderCart();
        updateCartIcon();
    }
}

document.body.addEventListener('click', removeItemHandler);