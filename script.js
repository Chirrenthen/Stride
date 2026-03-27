// Product Data with Real Shoe Images
const products = [
    {
        id: 1,
        name: "Classic Runner",
        category: "sneakers",
        price: 129,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Executive Oxford",
        category: "formal",
        price: 189,
        badge: "Premium",
        image: "https://cdn.shopify.com/s/files/1/0462/3191/2603/files/31389_9_640x640.jpg.webp?v=1756903035"
    },
    {
        id: 3,
        name: "Urban Casual",
        category: "casual",
        price: 99,
        badge: "New",
        image: "https://neemans.com/cdn/shop/files/ND_-_Urban_Casuals_-_Fusion_Black_-_Web_Optimized_e_a3cd7aea-e157-42f0-80e7-5fda2c23675e.jpg?v=1739883933&width=1600"
    },
    {
        id: 4,
        name: "Sport Pro",
        category: "sneakers",
        price: 159,
        badge: "Trending",
        image: "https://m.media-amazon.com/images/I/71CdfXbFB9L._AC_UY1000_.jpg"
    },
    {
        id: 5,
        name: "Leather Loafer",
        category: "formal",
        price: 169,
        badge: "Classic",
        image: "https://images.jdmagicbox.com/quickquotes/images_main/men-s-leather-loafer-shoe-size-9-2026599071-6dvtyr0y.jpg"
    },
    {
        id: 6,
        name: "Weekend Slip-On",
        category: "casual",
        price: 89,
        badge: "Sale",
        image: "https://inc5shop.com/cdn/shop/files/795-Navy_Blue_884bb7bb-cda0-43f8-a1cb-7640e3d64ac2.jpg?v=1755484080"
    },
    {
        id: 7,
        name: "Performance Run",
        category: "sneakers",
        price: 149,
        badge: "New",
        image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000451026865002/LDW3tsN1AR-RSO4451-6.jpeg"
    },
    {
        id: 8,
        name: "Derby Elite",
        category: "formal",
        price: 199,
        badge: "Premium",
        image: "https://www.myskatepalace.com/cdn/shop/files/image_b0164ee1-e67c-4cce-9112-a51494185c40.jpg?v=1683659447"
    },
    {
        id: 9,
        name: "Canvas Comfort",
        category: "casual",
        price: 79,
        badge: "Budget",
        image: "https://fausto.in/cdn/shop/files/FST_KI-920SKY_NAVY-MOOD-SHOT_400x.jpg?v=1703579533"
    }
];

// Cart Array
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilterButtons();
    setupNavigation();
    setupCart();
    setupContactForm();
});

// Render Products
function renderProducts(productList) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')">
                <div class="product-badge">${product.badge}</div>
                <div class="product-overlay">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Animate cards on load
    animateCards();
}

// Animate Product Cards
function animateCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter Products
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(product => product.category === filter);
                renderProducts(filtered);
            }
        });
    });
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Change navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Cart Functionality
function setupCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCart();
    });
    
    closeModal.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f0f0f0;';
        
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p style="color: #666;">$${item.price} × ${item.quantity}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <strong>$${item.price * item.quantity}</strong>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total;
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        showNotification('Thank you! We will get back to you soon.');
        form.reset();
    });
}

// Parallax Effect on Hero Shoe Image
window.addEventListener('scroll', () => {
    const heroShoeImage = document.querySelector('.hero-shoe-image');
    const scrolled = window.pageYOffset;
    
    if (heroShoeImage && scrolled < window.innerHeight) {
        heroShoeImage.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
    }
});