import { loadHeaderFooter, loadNavigation, getParam, darkMode } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(".main-header", ".main-footer");
loadNavigation(".main-nav");

const darkModeList = [".page-header", ".product-list_name", ".product-list_price"];
darkMode(darkModeList);

const productData = new ProductData();
const category = getParam("category");

const productList = new ProductList(category, productData);
const list = await productList.init();

const wrapper = document.querySelector(".product-list_wrapper");

const sortDir = getParam("sort");
const sortBtn = document.querySelector(".sort-dir");

const search = getParam("search");
const searchBar = document.querySelector(".search-bar");

document.title += ` ${category[0].toUpperCase()}${category.substring(1, category.length).replace("-", " ")}`;
productList.renderProductList(list, wrapper, search, searchBar, sortDir, sortBtn);

const searchBtn = document.querySelector(".search-btn");
let searchedList = [];

searchBar.addEventListener("change", (event) => {
    searchedList = productList.searchHandler(event.target.value);
})
searchBtn.addEventListener("click", () => {
    searchedList = productList.searchHandler(searchBar.value);
})

sortBtn.addEventListener("click", () => {
    productList.sortHandler(sortDir, search);
})