document.addEventListener("DOMContentLoaded", () => {
    const checkoutSummary = document.getElementById("checkout-summary");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const addressInput = document.getElementById("address");
    const contactInput = document.getElementById("contact");
    const confirmationDiv = document.getElementById("confirmation");
  
    let tempBuyNow = JSON.parse(localStorage.getItem("tempBuyNow"));
    let cartItems = [];
  
    // ✅ Use tempBuyNow if exists, otherwise use cart
    if (tempBuyNow) {
      cartItems = tempBuyNow;
    } else {
      cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    }
  
    // Render summary
    let totalAmount = 0;
    let summaryHTML = "<h3>🛍️ Order Summary</h3><ul>";
  
    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;
      summaryHTML += `<li>${item.name} x ${item.quantity} - ₹${itemTotal}</li>`;
    });
  
    summaryHTML += `</ul><p><strong>💰 Total: ₹${totalAmount}</strong></p>`;
    checkoutSummary.innerHTML = summaryHTML;
  
    // Checkout handler
    checkoutBtn.addEventListener("click", () => {
      const selectedPayment = document.querySelector('input[name="payment"]:checked');
      const address = addressInput.value.trim();
      const contact = contactInput.value.trim();
  
      if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
      }
  
      if (!address) {
        alert("Please enter your delivery address.");
        return;
      }
  
      if (!contact || !/^[0-9]\d{9}$/.test(contact)) {
        alert("Please enter a valid 10-digit contact number starting with 6-9.");
        return;
      }
  
      const order = {
        id: Date.now(),
        items: cartItems,
        paymentMethod: selectedPayment.value,
        address,
        contact,
        total: totalAmount,
        date: new Date().toLocaleString(),
        status: "Processing"
      };
  
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
  
      localStorage.removeItem("tempBuyNow");
      if (!tempBuyNow) localStorage.removeItem("cart");
  
      confirmationDiv.style.display = "block";
      confirmationDiv.innerHTML = `
        <h3>✅ Order Placed Successfully!</h3>
        <p><strong>📍 Address:</strong> ${order.address}</p>
        <p><strong>📞 Contact:</strong> ${order.contact}</p>
        <p><strong>💳 Payment:</strong> ${order.paymentMethod}</p>
        <p><strong>💰 Total:</strong> ₹${order.total}</p>
        <p><strong>🕒 Ordered At:</strong> ${order.date}</p>
        <p><strong>📦 Status:</strong> ${order.status}</p>
      `;
  
      checkoutBtn.disabled = true;
      checkoutBtn.innerText = "✔️ Order Placed";
    });
  });
  