import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Cart {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }
    
    renderCart() {
        const cart = getLocalStorage("cart");
        const wrapper = document.querySelector(this.parentElement);
        let total = 0;
        let output = `<h2 class="page-header">Cart</h2>
        <div class="product-list">`;
        if (!cart.length) {
            output += `<h3 class="page-header">Your cart is empty</h3>`;
        } else {
            cart.forEach((item) => {
                output +=
                    `<div class="cart-box">
                    <a class="cart_image-container" href="../product/?id=${item.Id}">
                        <img class="cart_image" src="${item.Image}" alt="${item.Name}" />
                    </a>
                    <div class="cart-info">
                        <a class="cart_name" href="../product/?id=${item.Id}">${item.Name}</a>
                        <p class="cart_price">R${item.Price}</p>
                        <p class="cart_qty">Qty: ${item.Quantity}</p>
                    </div>
                    <a class="cart_remove-item" id="${item.Id}">X</a>
                </div>`;
                total += parseFloat(item.Price) * item.Quantity;
            })
            output += `</div>
            <div class="cart-total">Total: R`;
            output += total.toFixed(2);

        }
        wrapper.innerHTML = output;
    }

}
export function removeItem(product) {
    if (product.classList.contains("cart_remove-item")) {
        const productId = product.id;
        const cart = getLocalStorage("cart");
        cart.forEach((item, index) => {
            if (item.Id === productId) {
                if (item.Quantity > 1) {
                    item.Quantity -= 1;
                } else {
                    console.log(index);
                    cart.splice(index, 1);
                }
            }
        })
        setLocalStorage("cart", cart);
        return true;
    } else {
        return false;
    }
}