import ProductData from "./ProductData.mjs";
import Product from "./ProductPage.mjs";
import { loadHeaderFooter, loadNavigation, getParam, updateCartIcon, darkMode, showTopBtn } from "./utils.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));
window.addEventListener("scroll", () => {
    showTopBtn(document.querySelector(".topBtn"));
})

const productData = new ProductData();
const productId = getParam("id");

let product = new Product(productId, productData);
let productInfo = await product.init();
product.rednerProductPage(productInfo, ".product_wrapper");

const addCart = document.querySelector(".product-page_add-cart-btn");
addCart.addEventListener("click", () => {
    product.addToCart(productInfo);
    updateCartIcon();
})
