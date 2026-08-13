import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import CategoryList from './components/CategoryList';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import AddressModal from './components/AddressModal';
import CheckoutSuccess from './components/CheckoutSuccess';
import AboutModal from './components/AboutModal';

import { categories, products } from './data/products';

export default function App() {
  // Cart state: array of { id, name, price, weight, image, quantity }
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blinkit_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('blinkit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    return {
      name: 'manisha',
      phone: '8999909099',
      email: 'manisha@123example.com'
    };
  });

  // Address state
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem('blinkit_address');
    try {
      return saved ? JSON.parse(saved) : 'Apartment 402, Block C, Silver Oak Residency, Sector 56, Gurugram, Haryana';
    } catch (e) {
      return saved || 'Apartment 402, Block C, Silver Oak Residency, Sector 56, Gurugram, Haryana';
    }
  });

  // Navigation / Filter / Search states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Overlays visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product modal details

  // Checkout states
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('blinkit_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('blinkit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blinkit_user');
    }
  }, [user]);

  useEffect(() => {
    if (address) {
      localStorage.setItem('blinkit_address', address);
    } else {
      localStorage.removeItem('blinkit_address');
    }
  }, [address]);

  // Reset category filter when search query is entered
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setActiveCategory('all');
    }
  }, [searchQuery]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter products by category & search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.tags && prod.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Category shelves for main dashboard
  const getShelfProducts = (catId) => {
    return products.filter((p) => p.category === catId && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // Login handlers
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    handleClearCart();
  };

  // Checkout triggers
  const handleCheckout = (coupon, discount, deliveryFee, handlingFee, grandTotal) => {
    setLastOrderDetails({
      items: cart,
      amount: grandTotal,
      address: address,
      discount,
      deliveryFee,
      handlingFee
    });
    setCart([]); // Clear cart
    setIsCartOpen(false); // Close drawer
    setCheckoutComplete(true); // Open success fullpage tracking overlay
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <Header
        cart={cart}
        address={address}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAddress={() => setIsAddressOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {/* Banner slider only when not searching or category is all */}
        {!searchQuery && activeCategory === 'all' && <BannerSlider />}

        {/* Categories navigation row */}
        {!searchQuery && (
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              setActiveCategory(id);
              // Smooth scroll to top of main shelf area
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Products Shelves */}
        {searchQuery ? (
          /* Search results screen */
          <div className="shelf-section">
            <h3 className="shelf-title">Search Results for "{searchQuery}"</h3>
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    cartItem={cart.find((item) => item.id === prod.id)}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClickCard={setSelectedProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results-card">
                <span className="no-results-emoji">🔍</span>
                <h4>No matching products found</h4>
                <p>Try searching for "milk", "bananas", "chips", or "coca-cola".</p>
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : activeCategory !== 'all' ? (
          /* Single category list screen */
          <div className="shelf-section">
            <h3 className="shelf-title">
              {categories.find((c) => c.id === activeCategory)?.name}
            </h3>
            <div className="product-grid">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  cartItem={cart.find((item) => item.id === prod.id)}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onClickCard={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Multi-shelf Blinkit style dashboard (default homepage) */
          <div className="multi-shelves-container">
            {categories.slice(1).map((cat) => {
              const shelfProducts = getShelfProducts(cat.id);
              if (shelfProducts.length === 0) return null;

              return (
                <div key={cat.id} className="shelf-section animate-slide-up">
                  <div className="shelf-header-row">
                    <h3 className="shelf-title">{cat.name}</h3>
                    <button
                      className="shelf-see-all"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      See All
                    </button>
                  </div>
                  <div className="product-grid">
                    {shelfProducts.slice(0, 6).map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        cartItem={cart.find((item) => item.id === prod.id)}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onClickCard={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="blinkit-footer">
        <div className="footer-content">
          <div className="footer-logo-desc">
            <h2 className="footer-logo">
              <span className="logo-yellow">blink</span>
              <span className="logo-green">it</span>
            </h2>
            <p>Blinkit is India's leading instant-commerce application, delivering groceries, fresh fruits, veggies, and daily essentials to your doorstep in minutes.</p>
          </div>
          <div className="footer-links-grid">
            <div className="links-col">
              <h4>Useful Links</h4>
              <span onClick={() => setIsAboutOpen(true)} style={{ cursor: 'pointer' }}>About Us</span>
              <span>Careers</span>
              <span>Press & Media</span>
              <span>Blog</span>
            </div>
            <div className="links-col">
              <h4>Help & Legal</h4>
              <span>Contact Support</span>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
              <span>Partner with Us</span>
            </div>
            <div className="links-col">
              <h4>Download App</h4>
              <div className="store-badge-placeholder">Google Play Store</div>
              <div className="store-badge-placeholder">Apple App Store</div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Blinkit Clone. Pair-programmed with Antigravity AI.
        </div>
      </footer>

      {/* MODALS & DRAWERS */}

      {/* Cart drawer */}
      {isCartOpen && (
        <CartDrawer
          cart={cart}
          address={address}
          user={user}
          onClose={() => setIsCartOpen(false)}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenAddress={() => setIsAddressOpen(true)}
        />
      )}

      {/* Product Inspect Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          cartItem={cart.find((item) => item.id === selectedProduct.id)}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Address Selector Modal */}
      {isAddressOpen && (
        <AddressModal
          onClose={() => setIsAddressOpen(false)}
          onSelectAddress={setAddress}
        />
      )}

      {/* About Modal */}
      {isAboutOpen && (
        <AboutModal
          onClose={() => setIsAboutOpen(false)}
        />
      )}

      {/* Checkout Success Track Screen */}
      {checkoutComplete && lastOrderDetails && (
        <CheckoutSuccess
          orderDetails={lastOrderDetails}
          onClose={() => {
            setCheckoutComplete(false);
            setLastOrderDetails(null);
          }}
        />
      )}

      <style>{`
        /* Shelves Styling */
        .shelf-section {
          margin-bottom: 40px;
        }

        .shelf-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .shelf-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .shelf-see-all {
          background: none;
          border: none;
          color: var(--brand-green);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .shelf-see-all:hover {
          color: var(--brand-green-hover);
        }

        /* Search Empty State */
        .no-results-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 60px 24px;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }

        .no-results-emoji {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .no-results-card h4 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .no-results-card p {
          font-size: 13px;
          color: var(--text-grey);
          margin-bottom: 20px;
        }

        .clear-search-btn {
          background-color: var(--text-dark);
          color: var(--white);
          border: none;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .clear-search-btn:hover {
          background-color: #333333;
        }

        /* Footer styling */
        .blinkit-footer {
          background-color: var(--white);
          border-top: 1px solid var(--border-color);
          padding: 60px 0 30px;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 40px;
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          gap: 60px;
          border-bottom: 1px solid var(--border-color);
        }

        .footer-logo-desc {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .footer-logo-desc p {
          font-size: 13px;
          color: var(--text-grey);
          line-height: 1.6;
          max-width: 360px;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .links-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .links-col h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .links-col span {
          font-size: 13px;
          color: var(--text-grey);
          cursor: pointer;
          transition: color 0.15s;
        }

        .links-col span:hover {
          color: var(--brand-green);
        }

        .store-badge-placeholder {
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 10px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          color: var(--text-grey);
          cursor: pointer;
          transition: all 0.2s;
        }

        .store-badge-placeholder:hover {
          border-color: var(--text-dark);
          color: var(--text-dark);
        }

        .footer-copyright {
          text-align: center;
          font-size: 12px;
          color: var(--text-light);
          padding-top: 30px;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-logo-desc p {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .blinkit-footer {
            padding: 40px 0 20px;
          }
        }
      `}</style>
    </div>
  );
}
