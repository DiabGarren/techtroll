import Cart from "./ShoppingCart.mjs";
import { loadHeaderFooter, loadNavigation } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

let cart = new Cart(".cart_wrapper");
cart.init();