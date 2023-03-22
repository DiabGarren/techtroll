const products = ["graphics-cards", "processors", "memory", "motherboards"];

export function loadHeaderFooter(headerElement, footerElement) {
    const location = getLocation()[0];
    const header = document.querySelector(headerElement);

    const logoLink = document.createElement("a");
    const logo = document.createElement("img");
    const welcome = document.createElement("h1");
    const cartLink = document.createElement("a");
    const cartLength = document.createElement("p");

    logoLink.setAttribute("href", "/techtroll/");
    cartLink.setAttribute("href", "/techtroll/cart/");
    logo.setAttribute("src", "/techtroll/images/logo.png");
    cartLength.className = "cart-length";


    logoLink.className = "logo";
    logo.setAttribute("alt", "Tech Troll Logo");

    welcome.textContent = "Welcome to Tech Troll";

    cartLength.textContent = getCartLength();

    cartLink.className = "cart-icon";
    cartLink.innerHTML = "&#128722;";

    cartLink.appendChild(cartLength);

    logoLink.appendChild(logo);

    header.appendChild(logoLink);
    header.appendChild(welcome);
    header.appendChild(cartLink);

    const footer = document.querySelector(footerElement);

    const info = document.createElement("p");
    info.id = "info";
    info.innerHTML = "Tech Troll &copy; 2023 - Garren Diab";

    footer.appendChild(info);
}

export function loadNavigation(parentElement) {
    const location = getLocation();
    const navigation = document.querySelector(parentElement);
    const outerList = document.createElement("ul");

    const listHome = document.createElement("li");
    const homeLink = document.createElement("a");
    const listProducts = document.createElement("li");
    const productsLink = document.createElement("a");
    const innerList = document.createElement("ul");

    if (location[0] == "home") {
        homeLink.className = "active";
    } else {
        homeLink.setAttribute("href", "../");
    }

    homeLink.textContent = "Home";
    listHome.appendChild(homeLink);

    listProducts.id = "product-drp";
    productsLink.textContent = "Products";


    listProducts.appendChild(productsLink);
    products.forEach((product) => {
        const item = document.createElement("li");
        const itemLink = document.createElement("a");

        if (location == "home") {
            itemLink.setAttribute("href", `product-list/?category=${product}`);
        } else if (location[0] == "product-list") {
            itemLink.setAttribute("href", `./?category=${product}`);
            if (location[1] == product) {
                itemLink.className = "active";
            }
        } else {
            itemLink.setAttribute("href", `../product-list/?category=${product}`);
        }
        itemLink.textContent = `${product[0].toUpperCase()}${product.substring(1, product.length).replace("-", " ")}`;
        item.appendChild(itemLink);
        innerList.appendChild(item);
    });
    listProducts.appendChild(innerList);

    outerList.appendChild(listHome);
    outerList.appendChild(listProducts);

    navigation.appendChild(outerList);
}

function getLocation() {
    let url = window.location.href;
    if (url.split("/")[4] == "index.html" || url.split("/")[4] == "") {
        return ["home"];
    } else if (url.split("/")[4] == "product-list") {
        return ["product-list", url.split("/")[5].split("=")[1]];
    } else {
        return [null];
    }
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function getCartLength() {
    const cart = getLocalStorage("cart");
    let length = 0;
    cart.forEach((item) => {
        length += item.Quantity;
    })
    return length;
}

export function updateCartIcon() {
    document.querySelector(".cart-length").innerHTML = getCartLength();
}

export function formatPrice(price) {
    let outputTotal = '';
    for (let i = 1; i <= String(price).length; i++) {
        outputTotal = String(price)[String(price).length - i] + outputTotal;
        if (i % 3 == 0 && i != String(price).length) {
            outputTotal = "," + outputTotal;
        }
    }
    return outputTotal;
}