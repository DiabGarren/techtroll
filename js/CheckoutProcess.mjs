import { formatPrice, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Checkout {
    constructor() {
        this.cart = getLocalStorage('cart');
        this.subtotal = 0;
        this.shippingTotal = 0;
        this.tax = 0;
        this.total = 0;
    }
    
    getSubtotal() {
        this.cart.forEach((item) => {
            this.subtotal += item.Price * item.Quantity;
        });
        return `(${this.cart.length})<input type="text" name="subtotal" value="R${formatPrice(this.subtotal)}" readonly>`;
    }

    getShipping() {
        let shipping = `<textarea name="shipping" readonly>`;
        let retailers = []
        this.cart.forEach((item) => {
            if (!retailers.includes(item.Retailer)) {
                retailers.push(item.Retailer);
            }
        });

        retailers.forEach((item) => {
            switch (item) {
                case "Evetech":
                    shipping += "Evetech: R100\n";
                    this.shippingTotal += 100;
                    break;
                case "Dreamware":
                    shipping += "Dreamware: R140\n";
                    this.shippingTotal += 140;
                    break;
                case "FirstShop":
                    shipping += "FirstShop: R60\n";
                    this.shippingTotal += 60;
                    break;
            }
        })
        shipping += `Total: R${this.shippingTotal}</textarea>`;
        return shipping;
    }

    getTax() {
        this.tax = parseInt(this.subtotal*0.04);

        return `<input type="text" name="tax" value="R${formatPrice(this.tax)}" readonly>`;
    }

    getTotal() {
        this.total = this.subtotal + this.shippingTotal + this.tax;

        return `<input type="text" name="orderTotal" value="R${formatPrice(this.total)}" readonly>`;
    }

    checkout() {
        setLocalStorage('cart', []);
        location.assign("/techtroll/checkout/success.html");
    }
}