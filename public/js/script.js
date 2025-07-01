let cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderProducts();
    renderGreeting();
    updateCart();
    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", updateGreeting);
});

function fetchAndRenderProducts() {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById('all');
            if (!container) return;
            container.innerHTML = '';
            products.forEach(product => {
                container.innerHTML += `
                  <div class="product">
                    <h3>${product.name}</h3>
                    <p><strong>תיאור:</strong> ${product.description}</p>
                    <p><strong>קטגוריה:</strong> ${product.category}</p>
                    <p><strong>מחיר:</strong> ${product.price} ש"ח</p>
                    <img src="${product.image}" alt="${product.name}" width="150">
                    <button onclick="addToCart('${product._id}', '${product.name}', '${product.image}', 1, ${product.price})">הוסף לעגלה</button>
                  </div>
                `;
            });
        });
}

function updateGreeting(event) {
  event.preventDefault();
  const fullnameEl = document.getElementById("fullname");
  if (!fullnameEl) return;
  const fullname = fullnameEl.value.trim();
  if (!fullname) return alert('אנא הכנס שם');
  localStorage.setItem("fullname", fullname);
  renderGreeting();
  fullnameEl.value = '';
}

function renderGreeting() {
    const greetingEl = document.getElementById("user-greeting");
    const fullname = localStorage.getItem("fullname");
    if (fullname && greetingEl) {
        greetingEl.innerHTML = `שלום, ${fullname}`;
    }
}

function toggleCart() {
  const el = document.getElementById("cart-content");
  if (el) el.style.display = (el.style.display === "block" ? "none" : "block");
}

function addToCart(id, name, image, quantity, price) {
    let item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity += quantity;
        item.total = item.quantity * item.price;
    } else {
        cartItems.push({ id, name, image, quantity, price, total: quantity * price });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCart();
}

function changeQuantity(id, delta) {
    const item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) return removeFromCart(id);
        item.total = item.quantity * item.price;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCart();
    }
}

function removeFromCart(id) {
    cartItems = cartItems.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCart();
}

function clearCart() {
    cartItems = [];
    localStorage.removeItem("cart");
    updateCart();
}

function updateCart() {
    updateCartCount();
    updateCartDropdown();
    updateTotalPrice();
}

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) {
        el.textContent = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    }
}

function updateTotalPrice() {
    const el = document.getElementById("total-price");
    if (el) {
        const totalSum = cartItems.reduce((sum, i) => sum + i.total, 0);
        el.textContent = `סכום כולל: ${totalSum} ש"ח`;
    }
}

function updateCartDropdown() {
    const tbody = document.getElementById("cart-items");
    if (!tbody) return;
    tbody.innerHTML = '';
    cartItems.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price} ש"ח</td>
          <td>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
          </td>
          <td>${item.total} ש"ח</td>
          <td><button class="remove-button" onclick="removeFromCart('${item.id}')">הסרה</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function proceedToCheckout() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.href = "/html/checkout.html";
}