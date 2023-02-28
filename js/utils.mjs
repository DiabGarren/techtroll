const products = [["Graphics Cards", "graphics-cards"], ["Processors", "processors"], ["Memory", "memory"], ["Motherboards", "motherboards"]];
export function loadHeaderFooter(parentElement) {
    const location = getLocation()[0];
    const header = document.querySelector(parentElement);

    const logoLink = document.createElement("a");
    const logo = document.createElement("img");
    const cartLink = document.createElement("a");

    if (location == "home") {
        cartLink.setAttribute("href", "cart/");
        logo.setAttribute("src", "images/logo.png");
    } else {
        logoLink.setAttribute("href", "../index.html");
        cartLink.setAttribute("href", "../cart/");
        logo.setAttribute("src", "../images/logo.png");
    }

    logoLink.className = "logo";
    logo.setAttribute("alt", "Tech Troll Logo");


    cartLink.className = "cart-icon";
    cartLink.textContent = "Cart";

    logoLink.appendChild(logo);

    header.appendChild(logoLink);
    header.appendChild(cartLink);
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
        homeLink.setAttribute("href", "../index.html");
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
            itemLink.setAttribute("href", `products/?category=${product[1]}`);
        } else if (location[0] == "products") {
            itemLink.setAttribute("href", `./?category=${product[1]}`);
            if (location[1] == product[1]) {
                itemLink.className = "active";
                document.title += ` ${product[0]}`;
            }
        } else {
            itemLink.setAttribute("href", `../products/?category=${product[1]}`);
        }
        itemLink.textContent = product[0];
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
    if (url.split("/")[4] == "index.html") {
        return ["home"];
    } else if(url.split("/")[4] == "products") {
        return ["products", url.split("/")[5].split("=")[1]];
    } else {
        return [null];
    }
}