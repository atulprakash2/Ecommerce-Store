// ===============================
// CHECKOUT.JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // Login check
  if (!localStorage.getItem("token")) {
    window.location.href = "/login.html";
    return;
  }


  // Load checkout data
  loadCheckout();


  // Place order button
  const placeOrderBtn =
    document.getElementById("placeOrderBtn");

  if (placeOrderBtn) {

    placeOrderBtn.addEventListener(
      "click",
      placeOrder
    );

  }


  // ===============================
  // PAYMENT OPTIONS
  // ===============================

  const paymentOptions =
    document.querySelectorAll(
      'input[name="payment"]'
    );

  const upiBox =
    document.getElementById("upiBox");

  const cardBox =
    document.getElementById("cardBox");


  paymentOptions.forEach(option => {

    option.addEventListener("change", () => {

      // Hide UPI
      if (upiBox) {
        upiBox.classList.add("hidden");
      }

      // Hide Card
      if (cardBox) {
        cardBox.classList.add("hidden");
      }


      // Show UPI
      if (
        option.value === "UPI" &&
        option.checked
      ) {

        if (upiBox) {
          upiBox.classList.remove("hidden");
        }

      }


      // Show Card
      if (
        option.value === "CARD" &&
        option.checked
      ) {

        if (cardBox) {
          cardBox.classList.remove("hidden");
        }

      }

    });

  });


  // ===============================
  // UPI APP SELECTION
  // ===============================

  const upiButtons =
    document.querySelectorAll(".upi-app");


  upiButtons.forEach(button => {

    button.addEventListener("click", () => {

      const app =
        button.dataset.app;


      const selectedUpi =
        document.getElementById(
          "selectedUpi"
        );


      if (selectedUpi) {

        selectedUpi.textContent =
          `${app} selected`;

      }


      // Remove selected class
      upiButtons.forEach(btn => {

        btn.classList.remove(
          "selected-upi"
        );

      });


      // Add selected class
      button.classList.add(
        "selected-upi"
      );

    });

  });

});


// ==========================================
// LOAD CHECKOUT
// ==========================================

async function loadCheckout() {

  try {

    const cartData =
      await getCart();


    if (
      !cartData.items ||
      cartData.items.length === 0
    ) {

      alert("Your cart is empty.");

      window.location.href =
        "/cart.html";

      return;

    }


    let total = 0;


    const checkoutItems =
      document.getElementById(
        "checkoutItems"
      );


    if (!checkoutItems) {
      return;
    }


    checkoutItems.innerHTML =
      cartData.items
        .map(item => {

          const product =
            item.product;


          const price =
            product
              ? Number(product.price)
              : 0;


          const subtotal =
            price * item.quantity;


          total += subtotal;


          return `

            <div class="checkout-product">

              <img
                src="${product ? product.image : ""}"
                alt="${product ? product.name : "Product"}"
                onerror="this.src='https://via.placeholder.com/70x70?text=Product'"
              >

              <div>

                <h4>
                  ${
                    product
                      ? product.name
                      : "Product"
                  }
                </h4>

                <p>
                  Qty: ${item.quantity}
                </p>

              </div>

              <strong>
                $${subtotal.toFixed(2)}
              </strong>

            </div>

          `;

        })
        .join("");


    const subtotalElement =
      document.getElementById(
        "checkoutSubtotal"
      );


    const totalElement =
      document.getElementById(
        "checkoutTotal"
      );


    if (subtotalElement) {

      subtotalElement.textContent =
        total.toFixed(2);

    }


    if (totalElement) {

      totalElement.textContent =
        total.toFixed(2);

    }


  } catch (error) {

    console.error(
      "Checkout error:",
      error
    );


    const message =
      document.getElementById(
        "checkoutMessage"
      );


    if (message) {

      message.textContent =
        "Unable to load checkout.";

    }

  }

}


// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder() {

  // ===============================
  // GET SHIPPING DETAILS
  // ===============================

  const name =
    document
      .getElementById("fullName")
      .value
      .trim();


  const phone =
    document
      .getElementById("phone")
      .value
      .trim();


  const address =
    document
      .getElementById("address")
      .value
      .trim();


  const city =
    document
      .getElementById("city")
      .value
      .trim();


  const pincode =
    document
      .getElementById("pincode")
      .value
      .trim();


  // ===============================
  // PAYMENT METHOD
  // ===============================

  const selectedPayment =
    document.querySelector(
      'input[name="payment"]:checked'
    );


  if (!selectedPayment) {

    alert(
      "Please select a payment method."
    );

    return;

  }


  const payment =
    selectedPayment.value;


  // ===============================
  // VALIDATE SHIPPING
  // ===============================

  if (
    !name ||
    !phone ||
    !address ||
    !city ||
    !pincode
  ) {

    alert(
      "Please fill all shipping details."
    );

    return;

  }


  // Phone validation
  if (!/^[0-9]{10}$/.test(phone)) {

    alert(
      "Please enter a valid 10-digit phone number."
    );

    return;

  }


  // PIN validation
  if (!/^[0-9]{6}$/.test(pincode)) {

    alert(
      "Please enter a valid 6-digit PIN code."
    );

    return;

  }


  // ===============================
  // UPI VALIDATION
  // ===============================

  if (payment === "UPI") {

    const selectedUpi =
      document.querySelector(
        ".upi-app.selected-upi"
      );


    if (!selectedUpi) {

      alert(
        "Please select Google Pay, PhonePe or Paytm."
      );

      return;

    }


    const app =
      selectedUpi.dataset.app;


    // Demo payment message
    const confirmPayment =
      confirm(
        `Continue with ${app} payment?`
      );


    if (!confirmPayment) {
      return;
    }

  }


  // ===============================
  // CARD VALIDATION
  // ===============================

  if (payment === "CARD") {

    const cardNumber =
      document
        .getElementById("cardNumber")
        .value
        .replace(/\s/g, "");


    const expiry =
      document
        .getElementById("expiry")
        .value
        .trim();


    const cvv =
      document
        .getElementById("cvv")
        .value
        .trim();


    // Card number
    if (!/^[0-9]{16}$/.test(cardNumber)) {

      alert(
        "Please enter a valid 16-digit card number."
      );

      return;

    }


    // Expiry
    if (
      !/^(0[1-9]|1[0-2])\/[0-9]{2}$/
        .test(expiry)
    ) {

      alert(
        "Please enter expiry as MM/YY."
      );

      return;

    }


    // CVV
    if (!/^[0-9]{3}$/.test(cvv)) {

      alert(
        "Please enter a valid 3-digit CVV."
      );

      return;

    }


    // Demo payment
    const confirmPayment =
      confirm(
        "Proceed with card payment?"
      );


    if (!confirmPayment) {
      return;
    }

  }


  // ===============================
  // NET BANKING
  // ===============================

  if (payment === "NETBANKING") {

    const confirmPayment =
      confirm(
        "Continue with Net Banking payment?"
      );


    if (!confirmPayment) {
      return;
    }

  }


  // ===============================
  // PLACE ORDER
  // ===============================

  const button =
    document.getElementById(
      "placeOrderBtn"
    );


  if (button) {

    button.disabled = true;

    button.textContent =
      "Processing Order...";

  }


  try {

    // Existing backend order function
    await createOrder();


    // Save delivery information
    localStorage.setItem(
      "lastOrderInfo",
      JSON.stringify({

        name: name,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        payment: payment

      })
    );


    // Redirect
    window.location.href =
      "/order-success.html";


  } catch (error) {

    console.error(
      "Order error:",
      error
    );


    alert(
      error.message ||
      "Unable to place order."
    );


    if (button) {

      button.disabled = false;

      button.textContent =
        "Place Order →";

    }

  }

}