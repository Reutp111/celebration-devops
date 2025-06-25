var cartItems = [];

function showTab(tabName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

function updateGreeting(event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    document.getElementById("user-greeting").innerHTML = "שלום, " + fullname;
	async function updateGreeting(event) {
    event.preventDefault(); // מונע את שליחת הטופס המובנה

    var fullname = document.getElementById("fullname").value;
    document.getElementById("user-greeting").innerHTML = "שלום, " + fullname;

    try {
        // שליחה לשרת
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: fullname
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message); // הצגת הודעה אם ישנה
        
        // ריקון השדות לאחר שליחה
        document.getElementById("fullname").value = '';
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the submission');
    }
}

}

function toggleCart() {
    var cartContent = document.getElementById("cart-content");
    if (cartContent.style.display === "block") {
        cartContent.style.display = "none";
    } else {
        cartContent.style.display = "block";
    }
}

function addToCart(name, image, quantity, price) {
    var itemIndex = cartItems.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        cartItems[itemIndex].total = cartItems[itemIndex].quantity * price;
    } else {
        cartItems.push({
            name: name,
            image: image,
            quantity: 1,
            price: price,
            total: price
        });
    }
    updateCart();
}

function updateTotalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].total;
    }
    document.getElementById("total-price").textContent = "סכום כולל: " + totalPrice + " ש''ח";
}

function updateCartCount() {
    var cartCount = document.getElementById("cart-count");
    var totalQuantity = 0;
    for (var i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity;
    }
    cartCount.textContent = totalQuantity;
}
function updateCartDropdown() {
    var cartDropdown = document.getElementById("cart-items");
    cartDropdown.innerHTML = "";
    for (var i = 0; i < cartItems.length; i++) {
        var listItem = document.createElement("tr");
        var itemName = document.createElement("td");
        itemName.textContent = cartItems[i].name;
        var itemPrice = document.createElement("td");
        itemPrice.textContent = cartItems[i].price + " ש''ח";
        var itemQuantity = document.createElement("td");
        
        // כפתור הורדה
        var decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = (function(name) {
            return function() {
                decreaseQuantityInCart(name);
            };
        })(cartItems[i].name);
        
        // כמות המוצר
        var quantitySpan = document.createElement("span");
        quantitySpan.textContent = cartItems[i].quantity;
        
        // כפתור הוספה
        var increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.onclick = (function(name) {
            return function() {
                increaseQuantityInCart(name);
            };
        })(cartItems[i].name);
        
        itemQuantity.appendChild(decreaseButton);
        itemQuantity.appendChild(quantitySpan);
        itemQuantity.appendChild(increaseButton);
        
        var itemTotal = document.createElement("td");
        itemTotal.textContent = cartItems[i].total + " ש''ח";
        
        var removeButtonCell = document.createElement("td");
        var removeButton = document.createElement("button");
        removeButton.textContent = "הסרה";
        removeButton.classList.add("remove-button");
        removeButton.onclick = (function(name) {
            return function() {
                removeFromCart(name);
            };
        })(cartItems[i].name);
        removeButtonCell.appendChild(removeButton);
        
        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        listItem.appendChild(itemQuantity);
        listItem.appendChild(itemTotal);
        listItem.appendChild(removeButtonCell);
        
        cartDropdown.appendChild(listItem);
    }
}


function removeFromCart(name) {
    var itemIndex = cartItems.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
    }
    updateCart();
}

function changeQuantity(name, change) {
    var item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        item.total = item.quantity * item.price;
        if (item.quantity <= 0) {
            removeFromCart(name);
        }
        updateCart();
    }
}

function updateCart() {
    updateCartCount();
    updateCartDropdown();
    updateTotalPrice(); 
}
function clearCart() {
    cartItems = []; // איפוס רשימת הפריטים בעגלה לרשימה ריקה
    updateCart(); // עדכון התצוגה של עגלת הקניות
}

function decreaseQuantityInCart(name) {
    changeQuantity(name, -1);
}

function increaseQuantityInCart(name) {
    changeQuantity(name, 1);
}

document.getElementById("login-form").addEventListener("submit", updateGreeting);
