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

    renderTemplate(list, parentElement) {
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

        parentElement.innerHTML = output;
    }

    renderProductList(list, parentElement, keyword, searchBar, sortDir, sortBtn) {
        if (sortDir == "desc") {
            list.reverse();
            sortBtn.innerHTML = "&#8659;";
        } else {
            sortBtn.innerHTML = "&#8657;";
        }
        if (keyword) {
            searchBar.value = keyword;
            this.search(keyword, list, parentElement);
        } else {
            this.renderTemplate(list, parentElement);
        }
    }

    search(keyword, productList, parentElement) {
        const newList = [];
        productList.forEach(product => {
            if (product.Name.toUpperCase().includes(keyword.toUpperCase())) {
                newList.push(product);
            }
        });

        if (newList.length == 0) {
            parentElement.innerHTML = `<h2 class="page-header">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
                <h3 class="page-header">No products found</h3>`;
        } else {
            this.renderTemplate(newList, parentElement);

        }
        return newList;
    }

    searchHandler(keyword) {
        if (keyword.length > 0) {
            document.location = `/techtroll/product-list/?category=${this.category}&search=${keyword}`;
        } else {
            document.location = `/techtroll/product-list/?category=${this.category}`;
        }
    }

    sort(productList, parentElement) {
        productList.reverse();
        this.renderProductList(productList, parentElement);
    }

    sortHandler(sortDir, keyword) {
        if (!keyword) {
            if (!sortDir || sortDir == "asc") {
                document.location = `/techtroll/product-list/?category=${this.category}&sort=desc`;
            } else {
                document.location = `/techtroll/product-list/?category=${this.category}&sort=asc`;
            }
        } else {
            if (!sortDir || sortDir == "asc") {
                document.location = `/techtroll/product-list/?category=${this.category}&search=${keyword}&sort=desc`;
            } else {
                document.location = `/techtroll/product-list/?category=${this.category}&search=${keyword}&sort=asc`;
            }
        }
    }
}