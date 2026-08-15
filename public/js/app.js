let allProducts = [];


/* ================= LOAD PRODUCTS ================= */

async function loadProducts() {

  const grid = document.getElementById("productGrid");

  try {

    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    allProducts = await response.json();

    displayProducts(allProducts);

  } catch (error) {

    console.error(error);

    grid.innerHTML = `
      <div class="loading">
        <h3>Unable to load products</h3>
        <p>Please check whether your server is running.</p>
      </div>
    `;
  }
}


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(products) {

  const grid = document.getElementById("productGrid");

  if (!products || products.length === 0) {

    grid.innerHTML = `
      <div class="loading">
        <h3>No products found</h3>
      </div>
    `;

    return;
  }


  grid.innerHTML = products.map(product => {

    const image =
      product.image ||
      "https://via.placeholder.com/500x400?text=Product";


    const price =
      Number(product.price || 0).toFixed(2);


    return `
      <div class="product-card">

        <img
          class="product-image"
          src="${image}"
          alt="${product.name}"
          onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'"
        >

        <div class="product-info">

          <span class="product-category">
            ${product.category || "Product"}
          </span>

          <h3 title="${product.name}">
            ${product.name}
          </h3>

          <div class="rating">
            ⭐⭐⭐⭐⭐
          </div>

          <div class="price">
            $${price}
          </div>

          <div class="product-buttons">

            <button
              class="details-btn"
              onclick="viewDetails('${product._id}')"
            >
              View Details
            </button>

            <button
              class="add-btn"
              onclick="addToCart('${product._id}')"
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");
}


/* ================= SEARCH ================= */

function searchProducts() {

  const input =
    document.getElementById("searchInput").value
      .toLowerCase()
      .trim();

  if (!input) {

    displayProducts(allProducts);

    return;
  }


  const filtered = allProducts.filter(product => {

    const name =
      (product.name || "").toLowerCase();

    const category =
      (product.category || "").toLowerCase();

    const description =
      (product.description || "").toLowerCase();


    return (
      name.includes(input) ||
      category.includes(input) ||
      description.includes(input)
    );

  });


  displayProducts(filtered);
}


/* Search when pressing Enter */

document.addEventListener("DOMContentLoaded", () => {

  const search =
    document.getElementById("searchInput");

  if (search) {

    search.addEventListener("keypress", event => {

      if (event.key === "Enter") {
        searchProducts();
      }

    });

  }

});


/* ================= CATEGORY FILTER ================= */

function filterCategory(category) {

  const filtered = allProducts.filter(product => {

    return (
      (product.category || "")
        .toLowerCase()
        .includes(category.toLowerCase())
    );

  });


  displayProducts(filtered);

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* ================= SORT ================= */

function sortProducts() {

  const value =
    document.getElementById("sortSelect").value;


  let products = [...allProducts];


  if (value === "low") {

    products.sort(
      (a, b) =>
        Number(a.price) - Number(b.price)
    );

  }


  if (value === "high") {

    products.sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    );

  }


  if (value === "name") {

    products.sort(
      (a, b) =>
        (a.name || "").localeCompare(b.name || "")
    );

  }


  displayProducts(products);
}


/* ================= VIEW DETAILS ================= */

function viewDetails(id) {

  window.location.href =
    `/product.html?id=${id}`;
}


/* ================= ADD TO CART ================= */

async function addToCart(id) {

  const token =
    localStorage.getItem("token");


  if (!token) {

    alert("Please login first.");

    window.location.href = "/login.html";

    return;
  }


  try {

    const response = await fetch("/api/cart", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify({
        productId: id,
        quantity: 1
      })

    });


    const data = await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        "Could not add product to cart."
      );

      return;
    }


    alert("Product added to cart! 🛒");

    updateCartCount();


  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }

}


/* ================= CART COUNT ================= */

async function updateCartCount() {

  const token =
    localStorage.getItem("token");


  const countElement =
    document.getElementById("cartCount");


  if (!token) {

    if (countElement) {
      countElement.textContent = "0";
    }

    return;
  }


  try {

    const response = await fetch("/api/cart", {

      headers: {
        "Authorization": `Bearer ${token}`
      }

    });


    if (!response.ok) return;


    const cart = await response.json();


    let count = 0;


    if (Array.isArray(cart)) {

      count = cart.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      );

    }


    if (cart && Array.isArray(cart.items)) {

      count = cart.items.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      );

    }


    if (countElement) {

      countElement.textContent = count;

    }


  } catch (error) {

    console.log("Cart count error:", error);

  }

}


/* ================= USER AREA ================= */

function setupUserArea() {

  const userArea =
    document.getElementById("userArea");


  if (!userArea) return;


  const user =
    localStorage.getItem("user");


  const token =
    localStorage.getItem("token");


  if (token && user) {

    let userData;

    try {
      userData = JSON.parse(user);
    } catch {
      userData = null;
    }


    const name =
      userData?.name ||
      userData?.username ||
      "User";


    userArea.innerHTML = `
      <span class="user-name">
        Hello, ${name}
      </span>

      <a href="#" onclick="logout()">
        Logout
      </a>
    `;

  } else {

    userArea.innerHTML = `
      <a href="/login.html">
        Login
      </a>
    `;

  }

}


/* ================= LOGOUT ================= */

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location.href = "/";
}


/* ================= START ================= */

document.addEventListener("DOMContentLoaded", () => {

  loadProducts();

  setupUserArea();

  updateCartCount();

});