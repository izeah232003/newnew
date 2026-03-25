document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Shop Feature: Search and Sort
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const productGrid = document.getElementById('productGrid');
    
    if (searchInput && sortSelect && productGrid) {
        const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

        function updateGrid() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortValue = sortSelect.value;

            // Filter
            let filteredCards = productCards.filter(card => {
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                return name.includes(searchTerm);
            });

            // Sort
            if (sortValue === 'low-high') {
                filteredCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₱', '').replace(/,/g, ''));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₱', '').replace(/,/g, ''));
                    return priceA - priceB;
                });
            } else if (sortValue === 'high-low') {
                filteredCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₱', '').replace(/,/g, ''));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₱', '').replace(/,/g, ''));
                    return priceB - priceA;
                });
            }

            // Re-render
            productGrid.innerHTML = '';
            filteredCards.forEach(card => productGrid.appendChild(card));
            
            // Show message if no results
            if (filteredCards.length === 0) {
                productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #777;">No products found matching your search.</p>';
            }
        }

        searchInput.addEventListener('input', updateGrid);
        sortSelect.addEventListener('change', updateGrid);
    }

    // Contact Form Feature
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            // Simulate sending
            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = 'white';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // --- TOAST NOTIFICATIONS ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Trigger reflow
        toast.offsetHeight;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- CART FEATURE ---
    let cart = JSON.parse(localStorage.getItem('thrift_cart')) || [];

    const cartHTML = `
        <div id="cartSidebar" class="cart-sidebar">
            <div class="cart-header">
                <h2>Your Cart</h2>
                <button id="closeCart" class="close-cart">&times;</button>
            </div>
            <div id="cartItems" class="cart-items"></div>
            <div class="cart-footer">
                <div class="cart-total">Total: <span id="cartTotal">₱0.00</span></div>
                <button id="checkoutBtn" class="btn-primary" style="width: 100%; margin-top: 1rem;">Checkout</button>
            </div>
        </div>
        <div id="cartOverlay" class="cart-overlay"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);

    const cartNavItem = document.createElement('li');
    cartNavItem.innerHTML = `<a href="#" id="cartIcon" class="cart-icon">Cart (<span id="cartCount">0</span>)</a>`;
    navLinks.appendChild(cartNavItem);

    const transNavItem = document.createElement('li');
    transNavItem.innerHTML = `<a href="#" id="transIcon" class="cart-icon">Orders</a>`;
    navLinks.appendChild(transNavItem);

    // Add "Add to Cart" and "Buy Now" buttons to all products
    document.querySelectorAll('.product-info').forEach(info => {
        const productName = info.querySelector('.product-name').textContent.toLowerCase();
        
        if (!info.querySelector('.product-size-container')) {
            let sizeOptions = '';
            if (productName.includes('boot') || productName.includes('converse') || productName.includes('shoe')) {
                sizeOptions = `
                    <option value="US 7">Size: US 7</option>
                    <option value="US 8">Size: US 8</option>
                    <option value="US 9" selected>Size: US 9</option>
                    <option value="US 10">Size: US 10</option>
                    <option value="US 11">Size: US 11</option>
                `;
            } else if (productName.includes('sunglass') || productName.includes('camera') || productName.includes('bag') || productName.includes('scarf') || productName.includes('cap') || productName.includes('glass') || productName.includes('belt') || productName.includes('tote')) {
                sizeOptions = `<option value="OS">Size: One Size</option>`;
            } else {
                sizeOptions = `
                    <option value="S">Size: S</option>
                    <option value="M" selected>Size: M</option>
                    <option value="L">Size: L</option>
                    <option value="XL">Size: XL</option>
                `;
            }
            const sizeDiv = document.createElement('div');
            sizeDiv.className = 'product-size-container';
            sizeDiv.innerHTML = `<select class="product-size">${sizeOptions}</select>`;
            info.appendChild(sizeDiv);
        }

        if (!info.querySelector('.product-actions')) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'product-actions';
            
            const addBtn = document.createElement('button');
            addBtn.className = 'btn-add-cart';
            addBtn.textContent = 'Add to Cart';
            
            const buyBtn = document.createElement('button');
            buyBtn.className = 'btn-buy-now';
            buyBtn.textContent = 'Buy Now';
            
            actionsDiv.appendChild(addBtn);
            actionsDiv.appendChild(buyBtn);
            info.appendChild(actionsDiv);
        }
    });

    // --- REVIEWS FEATURE ---
    const allReviews = JSON.parse(localStorage.getItem('thrift_reviews')) || {};

    document.querySelectorAll('.product-card').forEach(card => {
        if (!card.querySelector('.review-section')) {
            const productName = card.querySelector('.product-name').textContent;
            const productReviews = allReviews[productName] || [];
            
            const reviewSection = document.createElement('div');
            reviewSection.className = 'review-section';
            
            reviewSection.innerHTML = `
                <button class="toggle-reviews-btn">Reviews (<span class="review-count">${productReviews.length}</span>) ▾</button>
                <div class="reviews-container" style="display: none;">
                    <div class="reviews-list"></div>
                    <form class="review-form" data-product="${productName}">
                        <input type="text" class="review-name" placeholder="Your Name" required>
                        <select class="review-rating" required>
                            <option value="" disabled selected>Rating</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <textarea class="review-comment" placeholder="Your Review" rows="2" required></textarea>
                        <button type="submit" class="btn-submit-review">Submit Review</button>
                    </form>
                </div>
            `;
            
            card.appendChild(reviewSection);
            
            const toggleBtn = reviewSection.querySelector('.toggle-reviews-btn');
            const container = reviewSection.querySelector('.reviews-container');
            const list = reviewSection.querySelector('.reviews-list');
            const form = reviewSection.querySelector('.review-form');
            const countSpan = reviewSection.querySelector('.review-count');
            
            const renderReviews = () => {
                list.innerHTML = '';
                const currentReviews = allReviews[productName] || [];
                if (currentReviews.length === 0) {
                    list.innerHTML = '<div style="text-align:center; color:#999; font-size:0.9rem;">No reviews yet. Be the first!</div>';
                } else {
                    currentReviews.forEach(rev => {
                        const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
                        list.innerHTML += `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="review-author">${rev.name}</span>
                                    <span class="review-stars">${stars}</span>
                                </div>
                                <div class="review-text">${rev.comment}</div>
                            </div>
                        `;
                    });
                }
                countSpan.textContent = currentReviews.length;
            };
            
            renderReviews();
            
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent triggering card click if any
                const isHidden = container.style.display === 'none';
                container.style.display = isHidden ? 'block' : 'none';
                toggleBtn.innerHTML = `Reviews (<span class="review-count">${allReviews[productName]?.length || 0}</span>) ${isHidden ? '▴' : '▾'}`;
            });
            
            // Prevent clicking inside the review container from triggering the product card click
            container.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const name = form.querySelector('.review-name').value;
                const rating = parseInt(form.querySelector('.review-rating').value);
                const comment = form.querySelector('.review-comment').value;
                
                if (!allReviews[productName]) {
                    allReviews[productName] = [];
                }
                
                allReviews[productName].push({ name, rating, comment });
                localStorage.setItem('thrift_reviews', JSON.stringify(allReviews));
                
                renderReviews();
                form.reset();
                toggleBtn.innerHTML = `Reviews (<span class="review-count">${allReviews[productName].length}</span>) ▴`;
            });
        }
    });

    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');
    const cartIcon = document.getElementById('cartIcon');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEl = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function toggleCart(e) {
        if(e) e.preventDefault();
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    // cartOverlay click is handled below after checkout modal is defined

    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-cart') || e.target.classList.contains('btn-buy-now')) {
                const card = e.target.closest('.product-card');
                let name = card.querySelector('.product-name').textContent;
                const priceText = card.querySelector('.product-price').textContent;
                const price = parseFloat(priceText.replace('₱', '').replace(/,/g, ''));
                const image = card.querySelector('img').src;
                
                const sizeSelect = card.querySelector('.product-size');
                const size = sizeSelect ? sizeSelect.value : '';
                if (size && size !== 'OS') {
                    name = `${name} (${size})`;
                }

                const existingItem = cart.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ name, price, image, quantity: 1 });
                }
                
                updateCartUI();

                if (e.target.classList.contains('btn-buy-now')) {
                    checkoutTotalDisplay.textContent = cartTotalEl.textContent;
                    toggleCheckout();
                } else {
                    const originalText = e.target.textContent;
                    e.target.textContent = 'Added!';
                    e.target.style.backgroundColor = '#4CAF50';
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.color = 'white';
                    setTimeout(() => {
                        e.target.textContent = originalText;
                        e.target.style.backgroundColor = '';
                        e.target.style.borderColor = '';
                        e.target.style.color = '';
                    }, 1000);
                }
            }
        });
    }

    cartItemsContainer.addEventListener('click', (e) => {
        const increaseBtn = e.target.closest('.cart-increase');
        const decreaseBtn = e.target.closest('.cart-decrease');
        const removeBtn = e.target.closest('.cart-remove');

        if (increaseBtn) {
            const name = increaseBtn.dataset.name;
            const item = cart.find(i => i.name === name);
            if (item) item.quantity += 1;
            updateCartUI();
        } else if (decreaseBtn) {
            const name = decreaseBtn.dataset.name;
            const item = cart.find(i => i.name === name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                cart = cart.filter(i => i.name !== name);
            }
            updateCartUI();
        } else if (removeBtn) {
            const name = removeBtn.dataset.name;
            cart = cart.filter(i => i.name !== name);
            updateCartUI();
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-quantity-input')) {
            const name = e.target.dataset.name;
            const newQuantity = parseInt(e.target.value);
            const item = cart.find(i => i.name === name);
            
            if (item) {
                if (newQuantity >= 1) {
                    item.quantity = newQuantity;
                } else {
                    cart = cart.filter(i => i.name !== name);
                }
                updateCartUI();
            }
        }
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div style="text-align: center; color: #777; margin-top: 2rem;">Your cart is empty.</div>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                count += item.quantity;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>₱${item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <div class="cart-item-controls">
                            <button class="cart-decrease" data-name="${item.name}">-</button>
                            <input type="number" class="cart-quantity-input" data-name="${item.name}" value="${item.quantity}" min="1">
                            <button class="cart-increase" data-name="${item.name}">+</button>
                        </div>
                    </div>
                    <button class="cart-remove" data-name="${item.name}" title="Remove item">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartTotalEl.textContent = '₱' + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        cartCountEl.textContent = count;
        localStorage.setItem('thrift_cart', JSON.stringify(cart));
    }
    
    // Initialize cart UI on load
    updateCartUI();

    const checkoutHTML = `
        <div id="checkoutModal" class="checkout-modal">
            <div class="checkout-header">
                <h2>Checkout</h2>
                <button id="closeCheckout" class="close-cart">&times;</button>
            </div>
            <form id="checkoutForm" class="checkout-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <div class="address-input-group">
                    <input type="text" id="shippingAddress" placeholder="Shipping Address" required>
                    <button type="button" id="getLocationBtn" class="btn-location" title="Get Precise Location">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </button>
                </div>
                <select required>
                    <option value="" disabled selected>Select Payment Method</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="gcash">GCash</option>
                </select>
                <div class="checkout-total">Total: <span id="checkoutTotalDisplay">₱0.00</span></div>
                <div class="checkout-actions">
                    <button type="button" id="cancelCheckoutBtn" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-primary" style="flex: 1;">Place Order</button>
                </div>
            </form>
        </div>
        <div id="transModal" class="transactions-modal">
            <div class="checkout-header">
                <h2>Order History</h2>
                <button id="closeTrans" class="close-cart">&times;</button>
            </div>
            <div id="transList"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', checkoutHTML);

    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckout');
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');

    const getLocationBtn = document.getElementById('getLocationBtn');
    const shippingAddressInput = document.getElementById('shippingAddress');

    if (getLocationBtn && shippingAddressInput) {
        getLocationBtn.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                getLocationBtn.innerHTML = '<div class="spinner"></div>';
                navigator.geolocation.getCurrentPosition(async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        if (data && data.display_name) {
                            shippingAddressInput.value = data.display_name;
                        } else {
                            shippingAddressInput.value = `${latitude}, ${longitude}`;
                        }
                    } catch (error) {
                        console.error("Error fetching address:", error);
                        shippingAddressInput.value = `${position.coords.latitude}, ${position.coords.longitude}`;
                    } finally {
                        getLocationBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
                    }
                }, (error) => {
                    console.error("Geolocation error:", error);
                    showToast("Unable to retrieve your location. Please ensure location permissions are granted.", "error");
                    getLocationBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
                });
            } else {
                showToast("Geolocation is not supported by your browser.", "error");
            }
        });
    }

    const transModal = document.getElementById('transModal');
    const closeTransBtn = document.getElementById('closeTrans');
    const transIcon = document.getElementById('transIcon');
    const transList = document.getElementById('transList');

    let transactions = JSON.parse(localStorage.getItem('thrift_transactions')) || [];

    function renderTransactions() {
        if (transactions.length === 0) {
            transList.innerHTML = '<div class="empty-transactions">No past transactions found.</div>';
            return;
        }
        transList.innerHTML = transactions.map(tx => {
            const status = tx.status || 'Processing';
            const address = tx.address || 'Address not provided';
            const tracking = tx.trackingNumber || 'N/A';
            
            return `
            <div class="transaction-card">
                <div class="transaction-header">
                    <span>Order #${tx.id} <span class="status-badge ${status.toLowerCase()}">${status}</span></span>
                    <span>${tx.date}</span>
                </div>
                <div class="transaction-items">
                    ${tx.items.map(item => `
                        <div class="transaction-item">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>₱${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="transaction-total">Total: ${tx.total}</div>
                <div class="transaction-actions">
                    ${status !== 'Cancelled' ? `<button class="btn-track" data-id="${tx.id}">Track Order</button>` : `<button class="btn-track" disabled style="opacity: 0.5; cursor: not-allowed; border-color: #ccc; color: #999;">Tracking Unavailable</button>`}
                    ${status === 'Processing' ? `<button class="btn-cancel-order" data-id="${tx.id}">Cancel Order</button>` : ''}
                </div>
                <div class="tracking-info" id="track-${tx.id}" style="display: none;">
                    <div class="tracking-address">
                        <strong>Shipping To:</strong> ${address} <br>
                        <strong>Tracking #:</strong> ${tracking}
                    </div>
                    ${tx.address && tx.address !== 'N/A' && tx.address !== 'Address not provided' ? `
                    <div class="tracking-map">
                        <iframe 
                            width="100%" 
                            height="200" 
                            frameborder="0" 
                            scrolling="no" 
                            marginheight="0" 
                            marginwidth="0" 
                            src="https://maps.google.com/maps?q=${encodeURIComponent(tx.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed">
                        </iframe>
                    </div>
                    ` : ''}
                    ${status === 'Cancelled' ? `
                    <div class="tracking-timeline">
                        <div class="tracking-step completed active" style="color: #ff4444;">
                            <div class="tracking-dot" style="background: #ff4444; box-shadow: 0 0 0 1px #ff4444;"></div>
                            <div>Order Cancelled</div>
                        </div>
                    </div>
                    ` : `
                    <div class="tracking-timeline">
                        <div class="tracking-step completed active">
                            <div class="tracking-dot"></div>
                            <div>Processing</div>
                        </div>
                        <div class="tracking-step ${status === 'Shipped' || status === 'In Transit' || status === 'Delivered' ? 'completed active' : ''}">
                            <div class="tracking-dot"></div>
                            <div>Shipped</div>
                        </div>
                        <div class="tracking-step ${status === 'In Transit' || status === 'Delivered' ? 'completed active' : ''}">
                            <div class="tracking-dot"></div>
                            <div>In Transit</div>
                        </div>
                        <div class="tracking-step ${status === 'Delivered' ? 'completed active' : ''}">
                            <div class="tracking-dot"></div>
                            <div>Delivered</div>
                        </div>
                    </div>
                    `}
                </div>
            </div>
        `}).join('');
    }
    renderTransactions();

    transList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-track')) {
            const id = e.target.dataset.id;
            const infoDiv = document.getElementById(`track-${id}`);
            if (infoDiv.style.display === 'none') {
                infoDiv.style.display = 'block';
                e.target.textContent = 'Hide Tracking';
            } else {
                infoDiv.style.display = 'none';
                e.target.textContent = 'Track Order';
            }
        } else if (e.target.classList.contains('btn-cancel-order')) {
            const id = e.target.dataset.id;
            const txIndex = transactions.findIndex(t => t.id === id);
            if (txIndex > -1) {
                transactions[txIndex].status = 'Cancelled';
                localStorage.setItem('thrift_transactions', JSON.stringify(transactions));
                renderTransactions();
                showToast("Order cancelled successfully.", "success");
            }
        }
    });

    function toggleTrans(e) {
        if(e) e.preventDefault();
        transModal.classList.toggle('open');
        if (transModal.classList.contains('open')) {
            cartOverlay.classList.add('open');
            cartSidebar.classList.remove('open');
            checkoutModal.classList.remove('open');
        } else {
            cartOverlay.classList.remove('open');
        }
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    transIcon.addEventListener('click', toggleTrans);
    closeTransBtn.addEventListener('click', toggleTrans);

    function toggleCheckout() {
        checkoutModal.classList.toggle('open');
        if (checkoutModal.classList.contains('open')) {
            cartOverlay.classList.add('open');
            cartSidebar.classList.remove('open');
        } else {
            cartOverlay.classList.remove('open');
        }
    }

    closeCheckoutBtn.addEventListener('click', toggleCheckout);
    cancelCheckoutBtn.addEventListener('click', toggleCheckout);

    cartOverlay.addEventListener('click', () => {
        if (checkoutModal.classList.contains('open')) {
            toggleCheckout();
        } else if (cartSidebar.classList.contains('open')) {
            toggleCart();
        } else if (transModal.classList.contains('open')) {
            toggleTrans();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        checkoutTotalDisplay.textContent = cartTotalEl.textContent;
        toggleCheckout();
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const addressInput = checkoutForm.querySelector('input[placeholder="Shipping Address"]');
        const address = addressInput ? addressInput.value : 'N/A';
        
        const newTx = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toLocaleString(),
            items: [...cart],
            total: cartTotalEl.textContent,
            address: address,
            status: 'Processing',
            trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
        };
        transactions.unshift(newTx);
        localStorage.setItem('thrift_transactions', JSON.stringify(transactions));
        
        showToast('Order placed successfully! Thank you for shopping at THRIFTED.', 'success');
        cart = [];
        updateCartUI();
        checkoutForm.reset();
        toggleCheckout();
        renderTransactions();
    });
});
