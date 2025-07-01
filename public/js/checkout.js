document.addEventListener("DOMContentLoaded", () => {
    renderOrderCart();

    document.getElementById('order-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('order-name').value.trim();
        const phone = document.getElementById('order-phone').value.trim();
        const email = document.getElementById('order-email').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!cart.length) return alert('העגלה ריקה!');

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, paymentMethod, cart })
            });
            if (response.ok) {
                document.getElementById('order-success').textContent = 'הרכישה עברה בהצלחה! תודה שבחרת ב-celebration 🎉';
                document.getElementById('order-success').style.display = 'block';
                localStorage.removeItem("cart");
                document.getElementById('order-form').style.display = 'none';
            } else {
                alert("התרחשה שגיאה בשמירת ההזמנה. נסה שוב.");
            }
        } catch (err) {
            alert('שגיאת תקשורת');
        }
    });
});

function renderOrderCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const list = document.getElementById('order-cart-list');
    const totalDiv = document.getElementById('order-total');
    let total = 0;
    list.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} <b>x${item.quantity}</b> - ${item.total} ש"ח`;
        list.appendChild(li);
        total += item.total;
    });
    totalDiv.textContent = `סה"כ לתשלום: ${total} ש"ח`;
}