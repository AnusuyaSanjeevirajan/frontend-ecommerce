const products = [
  { id: 1, name: "Color Splash Tee", price: 129, image: "images (1).jpg" },
  { id: 2, name: "Indie Vibes Tee", price: 149, image: "images (2).jpg" },
  { id: 3, name: "Abstract Art Tee", price: 139, image: "images (3).jpg" },
  { id: 4, name: "Ocean Blue Tee", price: 109, image: "images (4).jpg" },
  { id: 5, name: "Sunset Hues Tee", price: 119, image: "images (5).jpg" },
  { id: 6, name: "Nightfall Tee", price: 135, image: "images (6).jpg" },
  { id: 7, name: "Graffiti Pop Tee", price: 149, image: "images (7).jpg" },
  { id: 8, name: "Mountain Escape Tee", price: 139, image: "images (8).jpg" },
  { id: 9, name: "City Lights Tee", price: 125, image: "images (9).jpg" },
  { id: 10, name: "Neo Future Tee", price: 159, image: "images (10).jpg" },
  { id: 11, name: "Retro Waves Tee", price: 119, image: "images (11).jpg" },
  { id: 12, name: "Wild Jungle Tee", price: 129, image: "images (12).jpg" },
  { id: 13, name: "Vintage Skull Tee", price: 145, image: "images (13).jpg" },
  { id: 14, name: "Pixel Hero Tee", price: 139, image: "images.jpg" },
  { id: 15, name: "Fire Fade Tee", price: 129, image: "download.jpg" },
  { id: 16, name: "Ocean Drift Tee", price: 119, image: "download (2).jpg" },
  { id: 17, name: "Zen Mode Tee", price: 149, image: "download (1).jpg" },
  { id: 18, name: "Color Burst Tee", price: 109, image: "premium_photo-1673356302067-aac3b545a362.jpg" }
];

// Load products dynamically
const container = document.getElementById("product-container");

products.forEach(product => {
  const item = document.createElement("div");
  item.classList.add("shop-item");
  item.setAttribute("draggable", "true"); // Make it draggable (optional)

  item.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <div class="btn-group">
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="buyNow(${product.id})" class="buy-btn">Buy Now</button>
    </div>
  `;

  // Optional: Add drag events
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", JSON.stringify(product));
  });

  container.appendChild(item);
});

// ✅ Add to cart function
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// ✅ Buy Now function
function buyNow(productId) {
  const product = products.find(p => p.id === productId);

  const tempOrder = [{
    ...product,
    quantity: 1
  }];

  localStorage.setItem("tempBuyNow", JSON.stringify(tempOrder));
  window.location.href = "checkout.html";
}
