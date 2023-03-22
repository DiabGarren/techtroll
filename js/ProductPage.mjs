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
        let output = `<h2 class="product-page_title">${item.Name}</h2>
        <div class="product-page">`;
        output +=
            `<a class="product-page_image-container" href="${item.Link}" target="_blank">
                        <img class="product-page_image" src="${item.Image}" alt="${item.Name}" />
                    </a>
                    <div class="product-page_info">
                        <h3 class="product-page_name">${item.Name}</h3>
                        <p class="product-page_price">R${item.Price}</p>
                        <p class="product-page_available">${item.Available}</p>
                        <a class="product-page_add-cart-btn">Add to Cart</a>
                        <a class="product-page_view-item" href="${item.Link}" target="_blank">View Original Page</a>
                    </div>`;

        output += `</div>`;

        wrapper.innerHTML = output;
    }

}