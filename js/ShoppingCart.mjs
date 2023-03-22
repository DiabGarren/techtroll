import { getLocalStorage } from "./utils.mjs";

export default class Cart {
    constructor(parentElement) {
        this.cart = getLocalStorage("cart");
        this.parentElement = parentElement;
    }

    init() {
        this.renderCart();
        this.cartTotal();
    }

    renderCart() {
        const wrapper = document.querySelector(this.parentElement);
        let output = `<h2 class="page-header">Cart</h2>
        <div class="product-list">`;
        if (!this.cart.length) {
            output += `<h3>Your cart it empty</h3>`;
        } else {
            this.cart.forEach((item) => {
                output +=
                    `<div class="cart-box">
                    <a class="cart_image-container" href="../product/?id=${item.Id}">
                        <img class="cart_image" src="${item.Image}" alt="${item.Name}" />
                    </a>
                    <div class="cart-info">
                        <a class="cart_name" href="../product/?id=${item.Id}">${item.Name}</a>
                        <p class="cart_price">R${item.Price}</p>
                        <p class="cart_qty">${item.Quantity}</p>
                    </div>
                    <a class="cart_remove-item">X</a>
                </div>`;
            })
            output += `</div>`;

        }
        wrapper.innerHTML = output;
    }

    cartTotal() {
        const wrapper = document.querySelector(this.parentElement);
        let output = wrapper.innerHTML;
        let total = 0;

        output += `<div class="cart-total">Total: R`;
        this.cart.forEach((item) => {
            total += parseFloat(item.Price) * item.Quantity;
        })
        output += total.toFixed(2);
        wrapper.innerHTML = output;
    }
}