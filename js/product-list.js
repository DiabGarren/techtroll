import { loadHeaderFooter, loadNavigation, getParam } from "./utils.mjs";
import ProductData from "./productData.mjs";
import ProductList from "./productList.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const productData = new ProductData();
const category = getParam("category");

const productList = new ProductList(category, productData);
const list = await productList.init();



document.title += ` ${category[0].toUpperCase()}${category.substring(1, category.length).replace("-", " ")}`;
productList.renderProductList(list, ".product-list_wrapper")