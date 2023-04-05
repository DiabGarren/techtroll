import Checkout from "./CheckoutProcess.mjs";
import { darkMode, loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const darkModeList = [];
darkMode(darkModeList);

let checkout = new Checkout();

document.querySelector("#checkout_subtotal").innerHTML += `${checkout.getSubtotal()}`;
document.querySelector("#checkout_shipping").innerHTML += `${checkout.getShipping()}`;
document.querySelector("#checkout_tax").innerHTML +=`${checkout.getTax()}`;
document.querySelector("#checkout_total").innerHTML +=`${checkout.getTotal()}`;

document.querySelector("#checkout_submit").addEventListener("click", (event) => {
    event.preventDefault();
    checkout.checkout();
})