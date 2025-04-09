let allProducts = [];

async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  allProducts = await res.json();
  displayProducts(allProducts);
  console.log(allProducts);
}

function displayProducts(products) {
  const liked = JSON.parse(localStorage.getItem("liked")) || [];
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product) => {
    const isLiked = liked.includes(product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
  <img src="${product.image}" alt="${product.title}" />
  <h4>${product.title}</h4>
  <p>$${product.price}</p>
  <div class="btn-group">
  <button class="view-btn" onclick="viewDetails(${
    product.id
  })">View Details</button>
  <button onclick="toggleLike(${product.id})">${isLiked ? "💖" : "❤️"}</button>
  </div>
`;
    container.appendChild(card);
  });
}

// Liked products array
// let liked = JSON.parse(localStorage.getItem("liked")) || [];

function toggleLike(productId) {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];

  if (liked.includes(productId)) {
    liked = liked.filter((id) => id !== productId);
    Swal.fire({
      title: "Removed!",
      text: "Product removed from liked products.",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    liked.push(productId);
    Swal.fire({
      title: "Added!",
      text: "Product added to liked products.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  localStorage.setItem("liked", JSON.stringify(liked));
  displayProducts(allProducts); // Refresh buttons and display
}

function filterProducts() {
  let filtered = [...allProducts];
  const search = document.getElementById("searchInput").value.toLowerCase();
  const min = parseFloat(document.getElementById("minPrice").value) || 0;
  const max = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const categories = Array.from(
    document.querySelectorAll(".category-filter:checked")
  ).map((el) => el.value);

  filtered = filtered.filter(
    (p) =>
      p.title.toLowerCase().includes(search) &&
      p.price >= min &&
      p.price <= max &&
      (categories.length === 0 || categories.includes(p.category))
  );

  displayProducts(filtered);
}

// Go to Liked Page
document.getElementById("likedBtn").addEventListener("click", () => {
  window.location.href = "../LikedPage/index.html";
});

// Search & Filters
document
  .getElementById("searchInput")
  .addEventListener("input", filterProducts);
document.getElementById("minPrice").addEventListener("input", filterProducts);
document.getElementById("maxPrice").addEventListener("input", filterProducts);
document
  .querySelectorAll(".category-filter")
  .forEach((cb) => cb.addEventListener("change", filterProducts));

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  Swal.fire({
    title: "Logged out!",
    text: "You have successfully logged out.",
    icon: "info",
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "../index.html";
  });
});

// Dark Mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

function viewDetails(id) {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("overlayImg").src = product.image;
  document.getElementById("overlayTitle").textContent = product.title;
  document.getElementById("overlayCategory").textContent = product.category;
  document.getElementById("overlayPrice").textContent = product.price;
  document.getElementById("overlayDesc").textContent = product.description;

  document.getElementById("productOverlay").classList.remove("hidden");
}

// Close overlay
document.getElementById("closeOverlay").addEventListener("click", () => {
  document.getElementById("productOverlay").classList.add("hidden");
});
loadProducts();
