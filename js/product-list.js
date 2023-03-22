import { loadHeaderFooter, loadNavigation, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const productData = new ProductData();
const category = getParam("category");

const productList = new ProductList(category, productData);
const list = await productList.init();

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchedList = [];

const sortDir = document.querySelector(".sort-dir");

document.title += ` ${category[0].toUpperCase()}${category.substring(1, category.length).replace("-", " ")}`;
productList.renderProductList(list, ".product-list_wrapper")

searchBar.addEventListener("change", (event) => {
    searchedList = productList.search(event.target.value, list, ".product-list_wrapper");
})
searchBtn.addEventListener("click", () => {
    searchedList = productList.search(searchBar.value, list, ".product-list_wrapper");
})

sortDir.addEventListener("click", (event) => {
    if (event.target.textContent == "&#8657;" || event.target.textContent == "⇑") {
        event.target.innerHTML = "&#8659;";
    } else {
        event.target.innerHTML = "&#8657;";
    }
    if (searchedList.length == 0) {
        productList.sort(list, ".product-list_wrapper");
    } else {
        productList.sort(searchedList, ".product-list_wrapper");
    }
})