import ProductData from "./ProductData.mjs";
import Product from "./ProductPage.mjs";
import { loadHeaderFooter, loadNavigation, getParam } from "./utils.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const productData = new ProductData();
const productId = getParam("id");

let product = new Product(productId, productData);
let productInfo = await product.init();
product.rednerProductPage(productInfo, ".product_wrapper");
