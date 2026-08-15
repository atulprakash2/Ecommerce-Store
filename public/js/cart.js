document.addEventListener("DOMContentLoaded", () => {

  if (!localStorage.getItem("token")) {
    window.location.href = "/login.html";
    return;
  }

  const cartContainer = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (cartContainer) {
    loadCart();
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "/checkout.html";
    });
  }
});


async function loadCart() {

  try {

    const cart = await getCart();

    const container =
      document.getElementById("cart-items");

    if (!cart.items || cart.items.length === 0) {

      container.innerHTML = `
        <div class="empty-cart">
          <div>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products before checkout.</p>
          <a href="/" class="shop-btn">
            Continue Shopping
          </a>
        </div>
      `;

      document
        .getElementById("cart-summary")
        .classList.add("hidden");

      return;
    }


    let total = 0;


    container.innerHTML = cart.items.map(item => {

      const product = item.product;

      const price = product
        ? Number(product.price)
        : 0;

      const subtotal =
        price * item.quantity;

      total += subtotal;


      return `
        <div class="cart-item">

          <img
            src="${product ? product.image : ""}"
            alt="${product ? product.name : "Product"}"
            onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'"
          >

          <div class="item-details">

            <h3>
              ${product ? product.name : "Product"}
            </h3>

            <p class="cart-price">
              $${price.toFixed(2)}
            </p>

            <p>
              Subtotal:
              <strong>
                $${subtotal.toFixed(2)}
              </strong>
            </p>

          </div>


          <div class="item-actions">

            <label>Quantity</label>

            <input
              type="number"
              class="quantity-input"
              value="${item.quantity}"
              min="1"
              data-id="${item._id}"
            >

            <button
              class="remove-btn"
              data-id="${item._id}"
            >
              Remove
            </button>

          </div>

        </div>
      `;

    }).join("");


    document.getElementById("total-price")
      .textContent = total.toFixed(2);

    document
      .getElementById("cart-summary")
      .classList.remove("hidden");


    /* Quantity */

    document
      .querySelectorAll(".quantity-input")
      .forEach(input => {

        input.addEventListener("change", async event => {

          const itemId =
            event.target.dataset.id;

          const quantity =
            parseInt(event.target.value);


          if (!quantity || quantity < 1) {

            event.target.value = 1;

            return;
          }


          try {

            await updateCartItem(
              itemId,
              quantity
            );

            loadCart();

          } catch (error) {

            alert(error.message);

          }

        });

      });


    /* Remove */

    document
      .querySelectorAll(".remove-btn")
      .forEach(button => {

        button.addEventListener("click", async event => {

          const itemId =
            event.target.dataset.id;


          try {

            await removeCartItem(itemId);

            loadCart();

          } catch (error) {

            alert(error.message);

          }

        });

      });


  } catch (error) {

    console.error(error);

    document.getElementById("cart-items").innerHTML = `
      <div class="empty-cart">
        <h2>Unable to load cart</h2>
        <p>Please try again.</p>
      </div>
    `;

  }
}