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
        let output = `<h2 class="product-category">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
        <div class="product-list">`;

        list.forEach((item) => {
            output +=
                `<div class="product-box">
                    <a class="product-image_container" href="../product/?id=${item.Id}">
                        <img class="product-image" src="${item.Image}" alt="${item.Name}" />
                    </a>
                    <div class="product-info">
                        <a class="product-name" href="../product/?id=${item.Id}">${item.Name}</a>
                        <p class="product-price">R${item.Price}</p>
                        <p class="product-available">${item.Available}</p>
                    </div>
                    <a class="product-btn" href="../product/?id=${item.Id}">View Item</a>
                </div>`;
        })
        output += `</div>`;

        wrapper.innerHTML = output;
    }
}