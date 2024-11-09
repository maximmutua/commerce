// Sample product data
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 25.00,
        image: 'assets/images/product1.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 15.00,
        image: 'assets/images/product2.jpg'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 30.00,
        image: 'assets/images/product3.jpg'
    }
];

// Load products dynamically to the page
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
});

// Add to Cart functionality (mock function)
function addToCart(productId) {
    alert(`Product ${productId} has been added to the cart!`);
}
// Cart data
let cart = [];

// Load products dynamically to the page (already added before)
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    loadCart();
});

// Add to Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} has been added to the cart!`);
    saveCart();
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer && cart.length > 0) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Checkout function (mock)
function checkout() {
    alert('Proceeding to checkout!');
}
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Base URL for your API

// Load products dynamically to the page
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        fetch(`${API_BASE_URL}/products/`)
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image ? product.image : 'assets/images/placeholder.jpg'}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    `;
                    productGrid.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    loadCart();
});
// Load product details for product.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            fetch(`${API_BASE_URL}/products/${productId}/`)
                .then(response => response.json())
                .then(product => {
                    document.querySelector('.product-details').innerHTML = `
                        <img src="${product.image ? product.image : 'assets/images/placeholder.jpg'}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        }
    }
});
// Add to Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!cart.some(item => item.id === productId)) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    } else {
        cart = cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
    }

    alert(`${product.name} has been added to the cart!`);
    saveCart();
}

// Load Cart from Local Storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout!');
        // TODO: Implement actual checkout
    } else {
        alert('Your cart is empty!');
    }
}
function makeAuthenticatedRequest() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        alert('You must be logged in to perform this action');
        return;
    }

    fetch(`${API_BASE_URL}/some-protected-endpoint/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Protected data:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Load checkout items dynamically
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('checkout.html')) {
        loadCartItemsForCheckout();
    }
});

function loadCartItemsForCheckout() {
    const savedCart = localStorage.getItem('cart');
    const checkoutItemsContainer = document.getElementById('checkoutItems');

    if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        if (cartItems.length === 0) {
            checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            `;
            checkoutItemsContainer.appendChild(itemElement);
        });
    } else {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Place Order Function
function placeOrder() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert('You must be logged in to place an order.');
        return;
    }

    const savedCart = localStorage.getItem('cart');
    if (!savedCart || JSON.parse(savedCart).length === 0) {
        alert('Your cart is empty. Please add some products.');
        return;
    }

    const cartItems = JSON.parse(savedCart);
    const orderData = cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity
    }));

    fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
        .then(response => {
            if (response.status === 201) {
                alert('Order placed successfully!');
                localStorage.removeItem('cart'); // Clear cart after order
                window.location.href = 'index.html'; // Redirect to home
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data && data.error) {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Load user orders dynamically
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('orders.html')) {
        loadUserOrders();
    }
});

function loadUserOrders() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert('You must be logged in to view your orders.');
        return;
    }

    fetch(`${API_BASE_URL}/orders/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(orders => {
            const orderListContainer = document.getElementById('orderList');
            if (orders.length === 0) {
                orderListContainer.innerHTML = '<p>No orders found.</p>';
                return;
            }

            orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.classList.add('order-item');
                orderElement.innerHTML = `
                <h4>Product: ${order.product}</h4>
                <p>Quantity: ${order.quantity}</p>
                <p>Ordered at: ${new Date(order.ordered_at).toLocaleString()}</p>
            `;
                orderListContainer.appendChild(orderElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
