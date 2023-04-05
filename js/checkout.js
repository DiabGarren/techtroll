import Checkout from "./CheckoutProcess.mjs";
import ProductData from "./ProductData.mjs";
import { darkMode, loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
loadNavigation(document.querySelector(".main-nav"));

const darkModeList = [];
darkMode(darkModeList);

let checkout = new Checkout();

document.querySelector("#checkout_subtotal").innerHTML += `${checkout.getSubtotal()}`;
document.querySelector("#checkout_shipping").innerHTML += `${checkout.getShipping()}`;
document.querySelector("#checkout_tax").innerHTML +=`${checkout.getTax()}`;
document.querySelector("#checkout_total").innerHTML +=`${checkout.getTotal()}`;

document.querySelector("#checkout_submit").addEventListener("click", async (event) => {
    event.preventDefault();
    await checkout.checkout(document.querySelector("#checkout").elements);
})