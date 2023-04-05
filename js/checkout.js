import Checkout from "./CheckoutProcess.mjs";
import { darkMode, loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));


let checkout = new Checkout();

document.querySelector("#subtotal").textContent += ` (${checkout.getLength()})`;
document.querySelector("#checkout_subtotal").value += `${checkout.getSubtotal()}`;
document.querySelector("#checkout_shipping").textContent += `${checkout.getShipping()}`;
document.querySelector("#checkout_tax").value +=`${checkout.getTax()}`;
document.querySelector("#checkout_total").value +=`${checkout.getTotal()}`;

document.querySelector("#checkout_submit").addEventListener("click", async (event) => {
    event.preventDefault();
    await checkout.checkout(document.querySelector("#checkout").elements);
})