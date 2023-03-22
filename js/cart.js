import Cart from "./ShoppingCart.mjs";
import { loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";
import { removeItem } from "./ShoppingCart.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

let cart = new Cart(".cart_wrapper");
cart.renderCart();

function removeItemHandler (event) {
    let removed = removeItem(event.target)
    if (removed) {
        cart.renderCart();
        updateCartIcon();
    }
}

document.body.addEventListener('click', removeItemHandler);