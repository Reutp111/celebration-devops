document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את שליחת הטופס בדרך הרגילה

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3001/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the submission');
    }
});
