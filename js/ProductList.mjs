import { formatPrice } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, search, sortDir, page) {
        this.category = category;
        this.dataSource = dataSource;
        this.keyword = search;
        this.sortDir = sortDir;
        this.page = page;
    }

    async init() {
        const list = await this.dataSource.getProductsByCategory(this.category);
        return list;
    }

    renderTemplate(list, parentElement) {
        let output = `<h2 class="page-header">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
        <div class="product-list_pages">`;

        let page = 1;
        if (this.page) {
            page = parseInt(this.page);
        }
        let maxRender = 20;

        output += this.addPages(list, page, maxRender);

        output += `</div>
        <div class="product-list">`;
        let renderList = page * maxRender;
        if (list.length < renderList) {
            renderList = list.length;
        }
        for (let i = (page - 1) * maxRender; i < renderList; i++) {
            output +=
                `<div class="product-box">
                    <a class="product-list_image-container" href="/techtroll/product/?id=${list[i].Id}">
                        <img class="product-list_image" src="${list[i].ImageSmall}" alt="${list[i].Name}" />
                    </a>
                    <div class="product-list_info">
                        <a class="product-list_name" href="/techtroll/product/?id=${list[i].Id}">${list[i].Name}</a>
                        <p class="product-list_retailer"><b>${list[i].Retailer}</b></p>
                        <p class="product-list_price"><b>R${formatPrice(list[i].Price)}</b></p>
                    </div>
                    <a class="product-list_btn" href="/techtroll/product/?id=${list[i].Id}">View Item</a>
                </div>`;
        }
        output += `</div>`;
        output += `<div class="product-list_pages">`;
        output += this.addPages(list, page, maxRender);
        output += `</div>`;

        parentElement.innerHTML = output;
    }

    addPages(list, page, maxRender) {
        let search = "";
        if (this.keyword) {
            search = `&search=${this.keyword}`;
        }
        let sortDir = "";
        if (this.sortDir) {
            sortDir = `&sort=${this.sortDir}`;
        }

        let output = "";

        let maxPage = Math.ceil(list.length / maxRender);
        let maxNoPages = Math.floor(5 / 2);
        if (list.length < maxRender) {
            maxRender = list.length;
        } else {
            if (maxPage > 1) {
                if (page != 1) {
                    output += `<a href=/techtroll/product-list/?category=${this.category}${search}${sortDir}&page=${page - 1}><</a>`;
                }

                if (page - maxNoPages > 1) {
                    output += `<a href=/techtroll/product-list/?category=${this.category}${search}${sortDir}&page=1>1</a><p>..</p>`;
                }

                let max = 0;
                for (let i = page - maxNoPages; i <= page + maxNoPages; i++) {
                    if (i <= 0) {
                        continue;
                    }
                    if (i == page) {
                        output += `<p class="current-page">${i}</p>`;
                    } else {
                        if (i <= maxPage) {
                            output += `<a href=/techtroll/product-list/?category=${this.category}${search}${sortDir}&page=${i}>${i}</a>`;
                        }
                    }
                    max = i;
                }

                if (max < maxPage) {
                    output += `<p>..</p><a href=/techtroll/product-list/?category=${this.category}${search}${sortDir}&page=${maxPage}>${maxPage}</a>`;

                }

                if (page < maxPage) {
                    output += `<a href=/techtroll/product-list/?category=${this.category}${search}${sortDir}&page=${page + 1}>></a>`;
                }
            }
        }
        return output;
    }

    renderProductList(list, parentElement, searchBar, sortBtn) {
        if (this.sortDir == "desc") {
            list.reverse();
            sortBtn.innerHTML = "&#8659;";
        } else {
            sortBtn.innerHTML = "&#8657;";
        }
        if (this.keyword) {
            searchBar.value = this.keyword;
            this.search(list, parentElement);
        } else {
            this.renderTemplate(list, parentElement);
        }
    }

    search(productList, parentElement) {
        const newList = [];
        productList.forEach(product => {
            if (product.Name.toUpperCase().includes(this.keyword.toUpperCase())) {
                newList.push(product);
            }
        });

        if (!newList.length) {
            parentElement.innerHTML = `<h2 class="page-header">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
                <h3 class="page-header">No products found</h3>`;
        } else {
            this.renderTemplate(newList, parentElement);

        }
        return newList;
    }

    searchHandler(keyword) {
        if (keyword.length) {
            document.location = `/techtroll/product-list/?category=${this.category}&search=${keyword}`;
        } else {
            document.location = `/techtroll/product-list/?category=${this.category}`;
        }
    }

    sort(productList, parentElement) {
        productList.reverse();
        this.renderProductList(productList, parentElement);
    }

    sortHandler() {
        if (!this.keyword) {
            if (!this.sortDir || this.sortDir == "asc") {
                document.location = `/techtroll/product-list/?category=${this.category}&sort=desc`;
            } else {
                document.location = `/techtroll/product-list/?category=${this.category}&sort=asc`;
            }
        } else {
            if (!this.sortDir || this.sortDir == "asc") {
                document.location = `/techtroll/product-list/?category=${this.category}&search=${this.keyword}&sort=desc`;
            } else {
                document.location = `/techtroll/product-list/?category=${this.category}&search=${this.keyword}&sort=asc`;
            }
        }
    }
}