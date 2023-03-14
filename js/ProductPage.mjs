export default class Product {
    constructor(productId, dataScource) {
        this.productId = productId;
        this.dataScource = dataScource;
    }

    async init() {
        const product = await this.dataScource.getProduct(this.productId);
        return product;
    }
    
    rednerProductPage(item, parentElement) {
        console.log(item);
        const wrapper = document.querySelector(parentElement);
        let output = `<h2 class="product-category"></h2>
        <div class="product-list">`;
        output +=
                `<div class="product-box">
                    <a class="product-image_container" href="../products/?id=${item.Id}">
                        <img class="product-image" src="${item.Image}" alt="${item.Name}" />
                    </a>
                    <div class="product-info">
                        <a class="product-name" href="../products/?id=${item.Id}">${item.Name}</a>
                        <p class="product-price">R${item.Price}</p>
                        <p class="product-available">${item.Available}</p>
                    </div>
                    <a class="product-btn" href="../products/?id=${item.Id}">View Item</a>
                </div>`;
                
        output += `</div>`;

        wrapper.innerHTML = output;
    }

}