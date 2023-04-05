import Checkout from "./CheckoutProcess.mjs";
import { darkMode, loadHeaderFooter, loadNavigation, updateCartIcon } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));


let checkout = new Checkout();

document.querySelector("#checkout_subtotal").textContent += ` (${checkout.getLength()})`;
document.querySelector("#subtotal").value += `${checkout.getSubtotal()}`;
document.querySelector("#shipping").textContent += `${checkout.getShipping()}`;
document.querySelector("#tax").value +=`${checkout.getTax()}`;
document.querySelector("#total").value +=`${checkout.getTotal()}`;

document.querySelector("#submit").addEventListener("click", async (event) => {
    event.preventDefault();
    await checkout.checkout(document.querySelector("#checkout").elements);
})