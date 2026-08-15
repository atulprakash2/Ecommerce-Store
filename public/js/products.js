// ======================================================
// PRODUCTS.JS
// ======================================================

let allProducts = [];
let currentProducts = [];


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Products.js loaded");

    const productGrid =
        document.getElementById("product-grid");

    const productDetails =
        document.getElementById("product-details");


    // HOME PAGE
    if (productGrid) {
        loadProducts();
    }


    // PRODUCT DETAILS PAGE
    if (productDetails) {

        const params =
            new URLSearchParams(window.location.search);

        const productId =
            params.get("id");

        if (productId) {
            loadProduct(productId);
        }
    }

});


// ======================================================
// LOAD ALL PRODUCTS
// ======================================================

async function loadProducts() {

    const grid =
        document.getElementById("product-grid");

    if (!grid) {
        console.error("product-grid not found");
        return;
    }


    try {

        grid.innerHTML = `
            <div class="loading">
                Loading products...
            </div>
        `;


        console.log("Calling /api/products...");


        const products =
            await getProducts();


        console.log("Products received:", products);


        if (!Array.isArray(products)) {

            throw new Error(
                "Products API did not return an array"
            );
        }


        if (products.length === 0) {

            grid.innerHTML = `
                <div class="loading">
                    <h2>No Products Available</h2>
                </div>
            `;

            return;
        }


        allProducts = products;

        currentProducts = [...products];


        displayProducts(currentProducts);


    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        grid.innerHTML = `

            <div style="
                width:100%;
                text-align:center;
                padding:40px;
            ">

                <h2 style="color:red;">
                    Failed to Load Products
                </h2>

                <p>
                    ${error.message}
                </p>

                <button
                    onclick="loadProducts()"
                    class="btn btn-primary"
                >
                    🔄 Try Again
                </button>

            </div>

        `;

    }

}


// ======================================================
// DISPLAY PRODUCTS
// ======================================================

function displayProducts(products) {

    const grid =
        document.getElementById("product-grid");


    if (!grid) return;


    if (!products || products.length === 0) {

        grid.innerHTML = `
            <div class="loading">
                <h2>No Products Found</h2>
            </div>
        `;

        return;
    }


    let html = "";


    products.forEach(product => {

      let image = product.image || "";

if (image.includes("](")) {
    image = image.match(/\((.*?)\)/)?.[1] || "";
}

if (!image) {
    image = "https://via.placeholder.com/300x220?text=No+Image";
}


        const price =
            Number(product.price || 0)
                .toFixed(2);


        html += `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="
                            this.onerror=null;
                            this.src='https://via.placeholder.com/300x220?text=No+Image';
                        "
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p class="price">
                        ₹${price}
                    </p>


                    <p class="product-category">
                        ${product.category || "General"}
                    </p>


                    <!-- VIEW DETAILS -->

                    <a
                        href="/product.html?id=${product._id}"
                        class="product-btn btn-primary"
                    >
                        👁️ View Details
                    </a>


                    <!-- ADD TO CART -->

                    <button
                        type="button"
                        class="product-btn btn-cart"
                        onclick="addProductToCart('${product._id}')"
                    >
                        🛒 Add To Cart
                    </button>


                    <!-- BUY NOW -->

                    <button
                        type="button"
                        class="product-btn btn-buy"
                        onclick="buyNow('${product._id}')"
                    >
                        ⚡ Buy Now
                    </button>

                </div>

            </div>

        `;

    });


    grid.innerHTML = html;

}


// ======================================================
// LOAD SINGLE PRODUCT
// ======================================================

async function loadProduct(id) {

    const details =
        document.getElementById("product-details");


    if (!details) return;


    try {

        details.innerHTML = `
            <p>Loading product...</p>
        `;


        const product =
            await getProduct(id);


        if (!product) {

            throw new Error(
                "Product not found"
            );
        }


        let image = product.image || "";

if (image.includes("](")) {
    image = image.match(/\((.*?)\)/)?.[1] || "";
}

if (!image) {
    image = "https://via.placeholder.com/500x400?text=No+Image";
}

        details.innerHTML = `

            <div class="product-detail-image">

                <img
                    src="${image}"
                    alt="${product.name}"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/500x400?text=No+Image';
                    "
                >

            </div>


            <div class="details-info">

                <h2>
                    ${product.name}
                </h2>


                <h3 class="price">
                    ₹${Number(product.price).toFixed(2)}
                </h3>


                <p>
                    ${product.description}
                </p>


                <p>
                    <strong>
                        Category:
                    </strong>

                    ${product.category}
                </p>


                <p>
                    <strong>
                        Stock:
                    </strong>

                    ${product.countInStock}
                </p>


                <div class="details-buttons">


                    <button
                        type="button"
                        id="add-to-cart"
                        class="product-btn btn-cart"
                    >
                        🛒 Add To Cart
                    </button>


                    <button
                        type="button"
                        id="buy-now"
                        class="product-btn btn-buy"
                    >
                        ⚡ Buy Now
                    </button>


                </div>

            </div>

        `;


        // ADD TO CART

        const addCartBtn =
            document.getElementById(
                "add-to-cart"
            );


        addCartBtn.addEventListener(
            "click",
            async () => {

                await addProductToCart(
                    product._id,
                    true
                );

            }
        );


        // BUY NOW

        const buyNowBtn =
            document.getElementById(
                "buy-now"
            );


        buyNowBtn.addEventListener(
            "click",
            async () => {

                await buyNow(
                    product._id
                );

            }
        );


    } catch (error) {

        console.error(error);


        details.innerHTML = `

            <div style="text-align:center;">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    ${error.message}
                </p>

                <a
                    href="/"
                    class="product-btn btn-primary"
                >
                    ← Back to Shop
                </a>

            </div>

        `;

    }

}


// ======================================================
// ADD TO CART
// ======================================================

async function addProductToCart(
    productId,
    redirect = false
) {

    if (!localStorage.getItem("token")) {

        window.location.href =
            "/login.html";

        return;

    }


    try {

        await addToCart(
            productId,
            1
        );


        alert(
            "Product added to cart! 🛒"
        );


        updateCartCount();


        if (redirect) {

            window.location.href =
                "/cart.html";

        }


    } catch (error) {

        console.error(error);


        alert(
            error.message ||
            "Unable to add product to cart."
        );

    }

}


// ======================================================
// BUY NOW
// ======================================================

async function buyNow(productId) {

    if (!localStorage.getItem("token")) {

        window.location.href =
            "/login.html";

        return;

    }


    try {

        await addToCart(
            productId,
            1
        );


        // DIRECT CHECKOUT

        window.location.href =
            "/checkout.html";


    } catch (error) {

        console.error(error);


        alert(
            error.message ||
            "Unable to buy this product."
        );

    }

}


// ======================================================
// SEARCH PRODUCTS
// ======================================================

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const search =
        input.value
            .toLowerCase()
            .trim();


    if (!search) {

        currentProducts =
            [...allProducts];

        displayProducts(
            currentProducts
        );

        return;

    }


    currentProducts =
        allProducts.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search)

                ||

                product.description
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayProducts(
        currentProducts
    );

}


// ======================================================
// CATEGORY FILTER
// ======================================================

function filterCategory(category) {

    if (!allProducts.length) {
        return;
    }


    currentProducts =
        allProducts.filter(product => {

            return (
                product.category &&
                product.category.toLowerCase() ===
                category.toLowerCase()
            );

        });


    displayProducts(
        currentProducts
    );


    const productsSection =
        document.getElementById(
            "products"
        );


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// SORT PRODUCTS
// ======================================================

function sortProducts() {

    const select =
        document.getElementById(
            "sortSelect"
        );


    if (!select) return;


    const value =
        select.value;


    currentProducts =
        [...currentProducts];


    if (value === "low") {

        currentProducts.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );

    }


    else if (value === "high") {

        currentProducts.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );

    }


    else if (value === "name") {

        currentProducts.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    else {

        currentProducts =
            [...allProducts];

    }


    displayProducts(
        currentProducts
    );

}


// ======================================================
// CART COUNT
// ======================================================

async function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) return;


    if (!localStorage.getItem("token")) {

        cartCount.textContent = "0";

        return;

    }


    try {

        const cart =
            await getCart();


        let count = 0;


        if (
            cart &&
            cart.items
        ) {

            cart.items.forEach(item => {

                count +=
                    Number(
                        item.quantity || 0
                    );

            });

        }


        cartCount.textContent =
            count;


    } catch (error) {

        console.error(
            "Cart count error:",
            error
        );

    }

}


// Update cart count on page load

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

    }
);