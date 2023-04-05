import ProductData from "./ProductData.mjs";
import Product from "./ProductPage.mjs";
import { alert, formatPrice, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Checkout {
    constructor() {
        this.cart = getLocalStorage('cart');
        this.subtotal = 0;
        this.shippingTotal = 0;
        this.tax = 0;
        this.total = 0;

        this.data = new ProductData();
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
        this.tax = parseInt(this.subtotal * 0.04);

        return `<input type="text" name="tax" value="R${formatPrice(this.tax)}" readonly>`;
    }

    getTotal() {
        this.total = this.subtotal + this.shippingTotal + this.tax;

        return `<input type="text" name="orderTotal" value="R${formatPrice(this.total)}" readonly>`;
    }

    async getItemInfo(productId) {
        let product = new Product(productId, this.data)
        let productInfo = await product.init();
        return productInfo;
    }

    async checkout(form) {
        let success = true, Fname = "", Lname = "", email = "";
        for (let i = 0; i < form.length; i++) {
            switch (form[i].name) {
                case "first-name":
                    Fname = form[i].value;
                    break;
                case "last-name":
                    Lname = form[i].value;
                    break;
                case "email":
                    email = form[i].value;
                    break;
            }
            if (form[i].value === "") {
                success = "info";
                break;
            }
        }

        // Return error if there is an empty field
        if (success == "info") {
            alert("Error",
                `<h3>There was an error processing your order.</h3>
            <p>Please make sure all the fields are entered correctly.</p>`,
                "");
            return;
        }

        for (const item of this.cart) {
            let itemInfo = await this.getItemInfo(item.Id);

            if (! (itemInfo.Id === item.Id && itemInfo.Name === item.Name && itemInfo.Price === item.Price)) {
                success = "cart";
                break;
            }
        }
        // Return error if the product info in the cart doesn't match the actual product info
        if (success == "cart") {
            alert("Error",
                `<h3>There was an error processing your order.</h3>
            <p>There is an error with your cart.<br>
            Please try emptying and refilling your cart.</p>`,
                "");
            return;
        }

        // Empty the cart and send the user back to the homepage
        if (success == true) {
            setLocalStorage('cart', []);
            alert("Success",
                `<h3>Thank you <b>${Fname} ${Lname}</b>, for your order.</h3>
                <p>We will contact you at <b>${email}</b> shortly.</p>`,
                "/techtroll/");
        }
    }
}