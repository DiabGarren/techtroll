import { formatPrice } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource) {
        this.category = category;
        this.dataSource = dataSource;
    }

    async init() {
        const list = await this.dataSource.getProductsByCategory(this.category);
        return list;
    }

    renderProductList(list, parentElement) {
        const wrapper = document.querySelector(parentElement);
        let output = `<h2 class="page-header">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
        <div class="product-list">`;
        list.forEach((item) => {
            output +=
                `<div class="product-box">
                    <a class="product-list_image-container" href="/techtroll/product/?id=${item.Id}">
                        <img class="product-list_image" src="${item.ImageSmall}" alt="${item.Name}" />
                    </a>
                    <div class="product-list_info">
                        <a class="product-list_name" href="/techtroll/product/?id=${item.Id}">${item.Name}</a>
                        <p class="product-list_price"><b>R${formatPrice(item.Price)}</b></p>
                    </div>
                    <a class="product-list_btn" href="/techtroll/product/?id=${item.Id}">View Item</a>
                </div>`;
        })
        output += `</div>`;

        wrapper.innerHTML = output;
    }

    search(keyword, productList, parentElement) {
        const newList = [];
        if (keyword.length == 0) {
            this.renderProductList(productList, parentElement);
        } else {
            productList.forEach(product => {
                if (product.Name.toUpperCase().includes(keyword.toUpperCase())) {
                    newList.push(product);
                }
            });
            
            if (newList.length == 0) {
                document.querySelector(parentElement).innerHTML = `<h2 class="page-header">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
                <h3 class="page-header">No products found</h3>`;
            } else {
                this.renderProductList(newList, parentElement);
            }
        }
        return newList;
    }

    sort(productList, parentElement) {
        productList.reverse();
        this.renderProductList(productList, parentElement);
    }
}