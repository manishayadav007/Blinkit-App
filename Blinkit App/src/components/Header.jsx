import React, { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, User, ChevronDown, LogOut } from 'lucide-react';

export default function Header({
  cart,
  address,
  user,
  setSearchQuery,
  searchQuery,
  onOpenCart,
  onOpenLogin,
  onOpenAddress,
  onOpenAbout,
  onLogout
}) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    'Search "milk"',
    'Search "bread"',
    'Search "fresh bananas"',
    'Search "coca-cola"',
    'Search "potato chips"',
    'Search "cheese slices"',
    'Search "eggs"'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <header className="blinkit-header">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-logo" onClick={() => setSearchQuery('')}>
          <span className="logo-yellow">blink</span>
          <span className="logo-green">it</span>
        </div>

        {/* Location Picker */}
        <div className="header-location" onClick={onOpenAddress}>
          <div className="location-info">
            <span className="delivery-time">Delivery in 9 mins</span>
            <span className="current-address">
              {address ? `${address.substring(0, 24)}${address.length > 24 ? '...' : ''}` : 'Select Address'}
            </span>
          </div>
          <ChevronDown size={16} className="location-arrow" />
        </div>

        {/* Search Bar */}
        <div className="header-search">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* User Actions */}
        <div className="header-actions">
          <button className="about-btn-header" onClick={onOpenAbout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: 'var(--text-grey)', padding: '8px 12px', transition: 'opacity 0.2s' }}>
            About
          </button>
          {user ? (
            <div className="user-profile-menu">
              <span className="user-greeting" style={{ textTransform: 'none' }}>
                <User size={16} />
                {user.name}
              </span>
              <button className="logout-btn" onClick={onLogout} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="login-trigger" onClick={onOpenLogin}>
              Login
            </button>
          )}

          {/* Cart Pill */}
          <button
            className={`cart-pill-btn ${totalItems > 0 ? 'pulse-cart' : ''}`}
            onClick={onOpenCart}
          >
            <ShoppingCart size={18} />
            <span className="cart-pill-text">
              {totalItems > 0 ? (
                <>
                  <span className="item-count">{totalItems} items</span>
                  <span className="divider">|</span>
                  <span className="total-price">₹{totalPrice}</span>
                </>
              ) : (
                'My Cart'
              )}
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .blinkit-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background-color: var(--white);
          border-bottom: 1px solid var(--border-color);
          z-index: 100;
          display: flex;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }

        .header-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .header-logo {
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1.5px;
          display: flex;
          align-items: center;
          user-select: none;
        }

        .logo-yellow {
          color: var(--brand-yellow);
        }

        .logo-green {
          color: var(--brand-green);
        }

        .header-location {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: var(--radius-md);
          transition: background-color 0.2s ease;
          border-right: 1px solid var(--border-color);
          min-width: 170px;
        }

        .header-location:hover {
          background-color: var(--bg-light);
        }

        .location-info {
          display: flex;
          flex-direction: column;
        }

        .delivery-time {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .current-address {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-grey);
          margin-top: 1px;
        }

        .location-arrow {
          color: var(--text-dark);
          margin-top: 4px;
        }

        .header-search {
          flex: 1;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0 16px;
          transition: all 0.2s ease;
        }

        .search-wrapper:focus-within {
          background-color: var(--white);
          border-color: var(--brand-yellow);
          box-shadow: 0 0 0 3px rgba(248, 203, 70, 0.15);
        }

        .search-icon {
          color: var(--text-grey);
          margin-right: 12px;
        }

        .search-input {
          width: 100%;
          height: 46px;
          border: none;
          background: transparent;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-dark);
          outline: none;
        }

        .search-clear-btn {
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          font-size: 12px;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .search-clear-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--text-dark);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .login-trigger {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-dark);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 12px;
          transition: opacity 0.2s;
        }

        .login-trigger:hover {
          opacity: 0.8;
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-greeting {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .logout-btn {
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background-color: #fee2e2;
          color: #ef4444;
        }

        .cart-pill-btn {
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          border-radius: var(--radius-md);
          padding: 12px 18px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cart-pill-btn:hover {
          background-color: var(--brand-green-hover);
          transform: scale(1.02);
        }

        .pulse-cart {
          animation: pulseBorder 2s infinite, bounceSmall 0.4s ease-out;
        }

        .cart-pill-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .divider {
          opacity: 0.6;
        }

        @media (max-width: 900px) {
          .header-container {
            gap: 12px;
          }
          .header-location {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .blinkit-header {
            height: auto;
            padding: 12px 0;
          }
          .header-container {
            flex-wrap: wrap;
            gap: 10px;
            padding: 0 12px;
          }
          .header-logo {
            font-size: 26px;
          }
          .header-search {
            order: 3;
            width: 100%;
          }
          .search-input {
            height: 40px;
          }
          .header-actions {
            margin-left: auto;
          }
          .cart-pill-btn {
            padding: 8px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </header>
  );
}
