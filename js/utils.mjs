const products = ["graphics-cards", "processors", "memory", "motherboards"];

export function loadHeaderFooter(header, footer) {

    const logoLink = document.createElement("a");
    const logo = document.createElement("img");
    const welcome = document.createElement("h1");
    const darkModeWrapper = document.createElement("div");
    const cartLink = document.createElement("a");
    const cartLength = document.createElement("p");

    logoLink.setAttribute("href", "/techtroll/");
    cartLink.setAttribute("href", "/techtroll/cart/");
    logo.setAttribute("src", "/techtroll/images/logo.png");
    cartLength.className = "cart-length";


    logoLink.className = "logo";
    logo.setAttribute("alt", "Tech Troll Logo");

    welcome.textContent = "Welcome to Tech Troll";

    darkModeWrapper.className = "dark-mode_wrapper";
    darkModeWrapper.innerHTML = `<label for="dark-mode_check" style="display: none">Dark Mode</label><input type="checkbox" class="dark-mode_check" id="dark-mode_check">
    <svg class="dark-mode_circle" width="74" height="74" viewBox="0 0 75 75">
        <circle cx="37" cy="37" r="37" />
    </svg>

    <svg class="dark-mode_top-sun" width="37" height="37" viewBox="0 0 37 37" fill="none">
        <path d="M5 18.5H1M18.5 5V1M9 9L7.5 7.5L6 6M28 9L31 6M9 28L6 31M18.5 32V36M28 28L31 31M32 18.5H36"
            stroke-width="4" stroke-linecap="round" />
    </svg>

    <svg class="dark-mode_top-moon" width="36" height="35" viewBox="0 0 36 35" fill="none">
        <path
            d="M17.1555 1.06358C17.1555 1.06358 14.514 1.263 12.9128 1.77068C11.147 2.33057 10.1932 2.83759 8.67019 3.89201C6.74367 5.22575 5.72093 6.18081 4.42754 8.13465C3.2667 9.88827 2.87029 11.0584 2.30622 13.0844C1.8557 14.7026 1.59912 15.6473 1.59912 17.327C1.59912 19.0067 1.81572 19.9632 2.30622 21.5697C2.7934 23.1653 3.20589 24.0341 4.07399 25.4588C4.89314 26.8031 5.4357 27.5276 6.54887 28.6407C7.66203 29.7539 8.3865 30.2965 9.73085 31.1156C11.1555 31.9837 12.0243 32.3962 13.6199 32.8834C15.2264 33.3739 16.1829 33.5905 17.8626 33.5905C19.5423 33.5905 20.4871 33.3339 22.1052 32.8834C24.1312 32.3193 25.3013 31.9229 27.055 30.7621C29.0088 29.4687 29.9639 28.4459 31.2976 26.5194C32.352 24.9964 32.859 24.0426 33.4189 22.2768C33.9266 20.6756 34.126 18.0341 34.126 18.0341"
            stroke-width="4" stroke-linecap="round" />
    </svg>

    <svg class="dark-mode_bot-sun" width="19" height="19" viewBox="0 0 19 19" fill="none">
        <path
            d="M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z"
            stroke-width="4" />
    </svg>

    <svg class="dark-mode_bot-moon" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path
            d="M6.15547 1.06358C6.15547 1.06358 3.03671 3.91685 2.26638 6.36688C1.72642 8.08422 1.47218 8.8114 1.55928 10.6095C1.64054 12.2873 1.94537 13.6674 2.61994 15.2057C3.33003 16.825 3.84452 17.8445 5.09481 19.0948C6.3451 20.3451 7.36458 20.8596 8.9839 21.5697C10.5222 22.2442 11.9023 22.5491 13.5801 22.6303C15.3782 22.7174 16.1054 22.4632 17.8227 21.9232C20.2728 21.1529 23.126 18.0341 23.126 18.0341"
            stroke-width="4" stroke-linecap="round" />
    </svg>`;

    cartLength.textContent = getCartLength();

    cartLink.className = "cart-icon";
    cartLink.innerHTML = "&#128722;";

    cartLink.appendChild(cartLength);

    logoLink.appendChild(logo);

    header.appendChild(logoLink);
    header.appendChild(welcome);
    header.appendChild(darkModeWrapper);
    header.appendChild(cartLink);

    const info = document.createElement("p");
    info.id = "info";
    info.innerHTML = "Tech Troll &copy; 2023 - Garren Diab";

    footer.appendChild(info);
}

export function loadNavigation(navigation) {
    const location = getLocation();
    const outerList = document.createElement("ul");

    const listHome = document.createElement("li");
    const homeLink = document.createElement("a");
    const listProducts = document.createElement("li");
    const productsLink = document.createElement("a");
    const innerList = document.createElement("ul");

    if (location[0] == "home") {
        homeLink.className = "active";
    } else {
        homeLink.setAttribute("href", "/techtroll/");
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
            itemLink.setAttribute("href", `/techtroll/product-list/?category=${product}`);
        } else if (location[0] == "product-list") {
            itemLink.setAttribute("href", `/techtroll/product-list/?category=${product}`);
            if (location[1] == product) {
                itemLink.className = "active";
            }
        } else {
            itemLink.setAttribute("href", `/techtroll/product-list/?category=${product}`);
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
    let cart = getLocalStorage("cart");
    let length = 0;
    if (!cart) {
        cart = [];
    } else {
        cart.forEach((item) => {
            length += item.Quantity;
        })
    }
    return length;
}

export function updateCartIcon() {
    let cartIcon = document.querySelector(".cart-length")
    cartIcon.innerHTML = getCartLength();
    cartIcon.classList.add("cart-add");
    setTimeout(() => { cartIcon.classList.remove("cart-add"); }, 500);
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

export function alert(heading, message, destination) {
    document.querySelector("main").innerHTML +=
        `<div class="alert-wrapper">
        <div class="alert">
    <h2>${heading}</h2>
    ${message}
    <a href="${destination}">Continue</a>
    </div>
    </div>
    `;
}

function setDarkMode() {
    if (getLocalStorage("darkMode") == true) {
        document.querySelector(".dark-mode_check").checked = true;
        document.querySelector("body").classList.add("dark-mode");
    } else {
        document.querySelector(".dark-mode_check").checked = false;
        document.querySelector("body").classList.remove("dark-mode");
    }
}

export function darkMode() {
    document.querySelector(".dark-mode_check").addEventListener("click", () => {
        if (document.querySelector(".dark-mode_check").checked) {
            setLocalStorage("darkMode", true);
        } else {
            setLocalStorage("darkMode", false);
        }
        setDarkMode();
    });
    setDarkMode();
}