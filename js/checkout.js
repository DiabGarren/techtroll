import Checkout from "./CheckoutProcess.mjs";
import { loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

let checkout = new Checkout();
