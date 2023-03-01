export default class ProductData {

    async getData(category) {
        const res = await fetch(`../json/${category}.json`);
        const data = await res.json();
        return data;
    }
}