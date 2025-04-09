const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const clearBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: ₹${itemTotal}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceElement.textContent = `₹${total}`;
}

// Remove item from cart
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Clear all items
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

// Checkout with payment selection
checkoutBtn.addEventListener("click", () => {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) {
    alert("Please select a payment method.");
    return;
  }
  alert(`Thank you! Your order is confirmed with ${selectedPayment.value} payment.`);
  localStorage.removeItem("cart");
  renderCart();
});

// Initial cart rendering
renderCart();
