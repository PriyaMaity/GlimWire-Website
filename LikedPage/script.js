let allProducts = [];

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  allProducts = await res.json();
  displayLikedProducts();
}

function displayLikedProducts() {
  const likedIds = JSON.parse(localStorage.getItem("liked")) || [];
  const likedProducts = allProducts.filter((p) => likedIds.includes(p.id));
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (likedProducts.length === 0) {
    container.innerHTML = "<p>No liked products yet.</p>";
    return;
  }

  likedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <p>$${product.price}</p>
      <div class="btn-group">
        <button class="view-btn" onclick="viewDetails(${product.id})">View Details</button>
        <button class="remove-btn" onclick="removeFromLiked(${product.id})">Remove</button>
      </div>
    `;
    container.appendChild(card);
  });
}

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

function removeFromLiked(id) {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];
  liked = liked.filter((pid) => pid !== id);
  localStorage.setItem("liked", JSON.stringify(liked));
  displayLikedProducts();
}

document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "../MainPage/index.html";
});

document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

fetchProducts();
