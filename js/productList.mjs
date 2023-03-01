export default class ProductList {
    constructor(category, dataSource) {
        this.category = category;
        this.dataSource = dataSource;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        return list;
    }

    renderProductList(list, parentElement) {
        const wrapper = document.querySelector(parentElement);
        let output = `<h2 class="product-category">${this.category[0].toUpperCase()}${this.category.substring(1, this.category.length).replace("-", " ")}</h2>
        <div class="product-list">`;

        list.forEach((item) => {
            output +=
                `<div class="product-box">
                    <a class="product-info" href="../products/?id=${item.Id}">
                        <div class="product-image_container">
                            <img class="product-image" src="${item.Image}" alt="${item.Name}" />
                        </div>
                        <p class="product-name">${item.Name}</p>
                        <p class="product-price">R${item.Price}</p>
                        <p class="product-available">${item.Available}</p>
                    </a>
                    
                    <a class="product-btn" href="../products/?id=${item.Id}">View Item</a>
                </div>`;
        })
        output += `</div>`;

        wrapper.innerHTML = output;
    }
}