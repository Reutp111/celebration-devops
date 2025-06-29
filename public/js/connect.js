const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      return alert('אנא מלא/י את כל השדות');
    }

    try {
      const response = await fetch(`${window.location.origin}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'שגיאה');

      alert(result.message);
      contactForm.reset();
    } catch (error) {
      console.error('Fetch error:', error);
      alert('הייתה בעיה בשליחה');
    }
  });
}
