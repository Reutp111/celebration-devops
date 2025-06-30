let cartItems = [];
let products = [];

// --- טאב דינאמי
function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = 'none');
  const tabDiv = document.getElementById(tab);
  if (tabDiv) tabDiv.style.display = 'block';
  if(tab === 'concept') showConceptOptions();
  if(tab === 'event') showEventOptions();
  if(tab === 'all') showAllProducts();
}

// --- טעינת מוצרים מהשרת
async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        products = await res.json();
        showTab('all'); // ברירת מחדל
    } catch (err) {
        console.error("Failed to load products", err);
    }
}

// --- תפריט קונספט
function showConceptOptions() {
    const concepts = [...new Set(products.flatMap(p => p.concepts || []))];
    const container = document.getElementById('concept');
    container.innerHTML = `
        <h2>בחר קונספט:</h2>
        <select id="conceptSelect">
            <option disabled selected>בחר קונספט...</option>
            ${concepts.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
        <div id="conceptProducts"></div>
    `;
    document.getElementById('conceptSelect').onchange = function() {
        showProductsBy('concepts', this.value, 'conceptProducts');
    }
}

// --- תפריט אירוע
function showEventOptions() {
    const events = [...new Set(products.flatMap(p => p.events || []))];
    const container = document.getElementById('event');
    container.innerHTML = `
        <h2>בחר אירוע:</h2>
        <select id="eventSelect">
            <option disabled selected>בחר אירוע...</option>
            ${events.map(e => `<option value="${e}">${e}</option>`).join('')}
        </select>
        <div id="eventProducts"></div>
    `;
    document.getElementById('eventSelect').onchange = function() {
        showProductsBy('events', this.value, 'eventProducts');
    }
}

// --- הצגת מוצרים מסוננים
function showProductsBy(type, value, targetId) {
    const filtered = products.filter(p => (p[type] || []).includes(value));
    document.getElementById(targetId).innerHTML =
        filtered.map(renderProduct).join('');
}

// --- טאב כל המוצרים
function showAllProducts() {
    const container = document.getElementById('all');
    container.innerHTML = products.map(renderProduct).join('');
}

// --- רינדור מוצר בודד
function renderProduct(p) {
    return `
        <div class="product">
            <h3>${p.name}</h3>
            <p><strong>תיאור:</strong> ${p.description}</p>
            <p><strong>קטגוריה:</strong> ${p.category}</p>
            <p><strong>מחיר:</strong> ${p.price} ש"ח</p>
            <img src="${p.image}" alt="${p.name}" width="150">
            <button onclick="addToCart('${p.name}', '${p.image}', ${p.price})">הוסף לעגלה</button>
        </div>
    `;
}

// --- עגלת קניות
function addToCart(name, image, price) {
  const item = cartItems.find(i => i.name === name);
  if (item) {
    item.quantity++;
    item.total = item.quantity * price;
  } else {
    cartItems.push({ name, image, quantity: 1, price, total: price });
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

// --- פונקציות ניהול משתמש/עגלה קיימות
function toggleCart() {
  const el = document.getElementById("cart-content");
  if (el) el.style.display = (el.style.display === "block" ? "none" : "block");
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

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", updateGreeting);
}

// --- טעינת מוצרים אוטומטית
document.addEventListener("DOMContentLoaded", loadProducts);
