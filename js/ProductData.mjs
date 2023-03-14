export default class ProductData {

    async getData(category) {
        const res = await fetch(`../json/${category}.json`);
        const data = await res.json();
        return data;
    }

    async getProducts() {
        const res = await fetch(`../json/products.json`);
        const data = await res.json();
        return data;
    }

    async getProductsByCategory(category) {
        const productList = await this.getProducts();
        let products = [];
        productList.forEach(product => {
            if (product.Category === category) {
                products.push(product);
            }
        })
        return products;
    }

    async getProduct(id) {
        const productList = await this.getProducts();
        let item = [];
        productList.forEach(product => {
            if (product.Id === id) {
                item = product;
            }
        })
        return item;
    }
}