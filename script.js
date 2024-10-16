// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart with image
function addToCart(productName, price, imageUrl) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.qty++; // Increase quantity if product is already in the cart
    } else {
        cart.push({ name: productName, price: price, qty: 1, image: imageUrl }); // Add new product
    }
    updateCart(); // Update the cart display
}

// Function to update the cart display and save it to localStorage
function updateCart() {
    let cartHtml = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        cartHtml += `
        <div class="cart-item">
        <span class="cartFlex">
            <img src="${item.image}" alt="${item.name}" width="90">
            <p>${item.name}</p> 
        </span>
        <span class="cartFlex">
            <p>Qty: ${item.qty} </p> 
            <p style="margin-left:auto;">Rp ${item.price * item.qty}</p>
        </span>
        <button class="qty_btn" onclick="increaseQty('${item.name}')">+</button>
        <button class="qty_btn" onclick="decreaseQty('${item.name}')">-</button>
        <button class="qty_btn" onclick="removeFromCart('${item.name}')" style="float:right;">Remove</button>
        <br>
        </div>
        `;
    });

    document.getElementById('cart-items').innerHTML = cartHtml;
    document.getElementById('cart-total').innerText = total;
    document.getElementById('total').innerText = total;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to increase quantity
function increaseQty(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.qty++;
        updateCart();
    }
}

// Function to decrease quantity
function decreaseQty(productName) {
    const product = cart.find(item => item.name === productName);
    if (product && product.qty > 1) {
        product.qty--;
        updateCart();
    } else {
        removeFromCart(productName); // Remove product if quantity goes below 1
    }
}

// Function to remove product from cart and update localStorage
function removeFromCart(productName) {
    // Remove the product from the cart array
    cart = cart.filter(item => item.name !== productName);
    
    // Update localStorage with the new cart data
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back to localStorage
    
    updateCart(); // Update the cart display after removal
}


        // Function to open the modal and display cart items
function goToSummary() {
            updateModalCart(); // Update modal cart display
            document.getElementById('cartModal').style.display = "block"; // Show the modal
        }

        // Function to update the modal cart display
        function updateModalCart() {
            let modalCartHtml = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price * item.qty;
                const formattedPrice = (item.price * item.qty).toLocaleString('en-US');
                modalCartHtml += `
                <div class="cart-item">
                <span class="cartFlex">
                    <img src="${item.image}" alt="${item.name}" width="90" crossorigin="anonymous">
                    <p>${item.name}</p> 
                    <p style="margin-left:auto;">Qty: ${item.qty} </p> 
                </span>
                <span class="cartFlex2">
                    <p style="margin-left:auto;">Rp ${item.price * item.qty}</p>
                </span>
                </div>
                `;

            });
            const formattedTotal = total.toLocaleString('en-US');
            document.getElementById('modal-cart-items').innerHTML = modalCartHtml;
            document.getElementById('modal-cart-total').innerText = formattedTotal;
        }

        // Function to close the modal
        function closeModal() {
            document.getElementById('cartModal').style.display = "none"; // Hide the modal
        }

        // Close the modal when clicking outside of it
        window.onclick = function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

    document.getElementById("captureBtn").addEventListener("click", function() {
      // Select the modal by its ID
      var modal = document.getElementById("cartModal");

      html2canvas(modal, { useCORS: true, allowTaint: false }).then(function(canvas) {
        // Convert the canvas to a data URL
        var image = canvas.toDataURL("image/png");

        // Create a temporary link to download the image
        var link = document.createElement('a');
        link.href = image;
        link.download = 'Jejebean_CF19_po.png';

        // Simulate clicking the link to download the image
        link.click();
      });
    });

