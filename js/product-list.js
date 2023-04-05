import { loadHeaderFooter, loadNavigation, getParam, darkMode } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(document.querySelector(".main-header"), document.querySelector(".main-footer"));
darkMode();
loadNavigation(document.querySelector(".main-nav"));

const productData = new ProductData();
const category = getParam("category");
const search = getParam("search");
const sortDir = getParam("sort");
const page = getParam("page");

const productList = new ProductList(category, productData, search, sortDir, page);
const list = await productList.init();

const wrapper = document.querySelector(".product-list_wrapper");

const sortBtn = document.querySelector(".sort-dir");
const searchBar = document.querySelector(".search-bar");

document.title += ` ${category[0].toUpperCase()}${category.substring(1, category.length).replace("-", " ")}`;
productList.renderProductList(list, wrapper, searchBar, sortBtn);

const searchBtn = document.querySelector(".search-btn");
let searchedList = [];

searchBar.addEventListener("change", (event) => {
    searchedList = productList.searchHandler(event.target.value);
})
searchBtn.addEventListener("click", () => {
    searchedList = productList.searchHandler(searchBar.value);
})

sortBtn.addEventListener("click", () => {
    productList.sortHandler();
})