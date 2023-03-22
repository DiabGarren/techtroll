import { getLocalStorage } from "./utils.mjs";

export default class Cart {
    constructor() {
        this.cart = getLocalStorage("cart");
    }

    init() {
        this.renderCart(this.cart, ".cart_wrapper")
    }

    renderCart(list, parentElement) {
        console.log(list)
        const wrapper = document.querySelector(parentElement);
        let output = `<h2 class="product-category">Cart</h2>
        <div class="product-list">`;

        list.forEach((item) => {
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
                </div>`;
        })
        output += `</div>`;

        wrapper.innerHTML = output;
    }

}