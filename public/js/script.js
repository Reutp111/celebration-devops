let cartItems = [];

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = 'none');
  document.getElementById(tabName).style.display = 'block';
}

async function updateGreeting(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value;
  document.getElementById("user-greeting").textContent = `שלום, ${fullname}`;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: fullname })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    alert(result.message);
    document.getElementById("fullname").value = '';
  } catch (error) {
    console.error('Fetch error:', error);
    alert('There was a problem with the submission');
  }
}

function toggleCart() {
  const cartContent = document.getElementById("cart-content");
  cartContent.style.display = cartContent.style.display === "block" ? "none" : "block";
}

// מוספים לעגלה:
function addToCart(name, image, price) {
  const item = cartItems.find(item => item.name === name);
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
  const total = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  document.getElementById("cart-count").textContent = total;
}

function updateTotalPrice() {
  const totalSum = cartItems.reduce((sum, i) => sum + i.total, 0);
  document.getElementById("total-price").textContent = `סכום כולל: ${totalSum} ש''ח`;
}

function updateCartDropdown() {
  const tbody = document.getElementById("cart-items");
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

document.getElementById("login-form").addEventListener("submit", updateGreeting);
