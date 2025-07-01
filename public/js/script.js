let cartItems = [];

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = 'none');
  const tab = document.getElementById(tabName);
  if (tab) tab.style.display = 'block';
}

async function updateGreeting(event) {
  event.preventDefault();
  const fullnameEl = document.getElementById("fullname");
  const greetingEl = document.getElementById("user-greeting");
  if (!fullnameEl || !greetingEl) return;

  const fullname = fullnameEl.value.trim();
  if (!fullname) return alert('אנא הכנס שם');

  greetingEl.textContent = `שלום, ${fullname}`;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: fullname })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'שגיאה');

    alert(result.message);
    fullnameEl.value = '';
  } catch (error) {
    console.error('Fetch error:', error);
    alert('לא הצלחנו לשלוח את המידע');
  }
}

function toggleCart() {
  const el = document.getElementById("cart-content");
  if (el) el.style.display = (el.style.display === "block" ? "none" : "block");
}

function addToCart(name, image, quantity, price) {
  const item = cartItems.find(i => i.name === name);
  if (item) {
    item.quantity += quantity;
    item.total = item.quantity * item.price;
  } else {
    cartItems.push({ name, image, quantity, price, total: quantity * price });
  }
  updateCart();
}


function changeQuantity(name, delta) {
  const item = cartItems.find(i => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) return removeFromCart(name);
    item.total = item.quantity * item.price;
    updateCart();
  }
}

function removeFromCart(name) {
  cartItems = cartItems.filter(i => i.name !== name);
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
    el.textContent = `סכום כולל: ${totalSum} ש''ח`;
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
      <td>${item.price} ש''ח</td>
      <td>
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
      </td>
      <td>${item.total} ש''ח</td>
      <td><button class="remove-button" onclick="removeFromCart('${item.name}')">הסרה</button></td>`;
    tbody.appendChild(tr);
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", updateGreeting);
}
