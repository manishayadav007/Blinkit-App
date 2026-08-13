import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Ticket, ChevronRight, MapPin, ClipboardList } from 'lucide-react';

export default function CartDrawer({
  cart,
  address,
  user,
  onClose,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  onOpenLogin,
  onOpenAddress
}) {
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Delivery partner fee configuration
  const defaultDeliveryFee = 15;
  const isDeliveryFree = itemTotal >= 199 || (activeCoupon && activeCoupon.code === 'FREEGROW');
  const deliveryFee = isDeliveryFree ? 0 : defaultDeliveryFee;

  const handlingFee = itemTotal > 0 ? 4 : 0;

  // Coupon calculations
  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.code === 'BLINK50' && itemTotal >= 200) {
      discount = 50;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + handlingFee - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');

    const formattedCode = couponCode.trim().toUpperCase();

    if (formattedCode === 'BLINK50') {
      if (itemTotal < 200) {
        setCouponError('Minimum order amount for BLINK50 is ₹200');
      } else {
        setActiveCoupon({ code: 'BLINK50', description: 'Flat ₹50 OFF applied!' });
        setCouponCode('');
      }
    } else if (formattedCode === 'FREEGROW') {
      if (itemTotal < 150) {
        setCouponError('Minimum order amount for FREEGROW is ₹150');
      } else {
        setActiveCoupon({ code: 'FREEGROW', description: 'Free Delivery applied!' });
        setCouponCode('');
      }
    } else {
      setCouponError('Invalid coupon code. Try BLINK50 or FREEGROW');
    }
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const handleCheckoutClick = () => {
    if (!user) {
      onOpenLogin();
    } else if (!address) {
      onOpenAddress();
    } else {
      onCheckout(activeCoupon, discount, deliveryFee, handlingFee, grandTotal);
    }
  };

  return (
    <div className="cart-drawer-overlay animate-fade" onClick={onClose}>
      <div className="cart-drawer animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="header-title-row">
            <ShoppingBag size={20} className="header-bag-icon" />
            <h3>My Cart</h3>
            <span className="header-item-count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Area */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            /* Empty Cart State */
            <div className="empty-cart-state">
              <div className="empty-cart-graphic">🛒</div>
              <h3>You don't have any items in your cart</h3>
              <p>Your favorite groceries are just a click away!</p>
              <button className="empty-cart-btn" onClick={onClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            /* Active Cart Items */
            <div className="cart-items-container">
              {/* Delivery Speed Info */}
              <div className="cart-delivery-banner">
                <div className="banner-pulse-dot"></div>
                <div className="banner-text-column">
                  <span className="banner-headline">Delivery in 9 minutes</span>
                  <span className="banner-subline">Sourced from your local Blinkit dark store</span>
                </div>
              </div>

              {/* Items List */}
              <div className="items-list-card">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-weight">{item.weight}</span>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">₹{item.price}</span>
                        {item.discount && item.discount !== '0% OFF' && (
                          <span className="cart-item-discount">{item.discount}</span>
                        )}
                      </div>
                    </div>
                    {/* Item Count Changer */}
                    <div className="cart-item-adjuster">
                      <button className="cart-adjust-btn" onClick={() => onRemoveFromCart(item.id)}>
                        <Minus size={10} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-adjust-btn" onClick={() => onAddToCart(item)}>
                        <Plus size={10} />
                      </button>
                    </div>
                    {/* Subtotal of item */}
                    <span className="cart-item-total">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Card */}
              <div className="coupon-card">
                <div className="coupon-header-row">
                  <Ticket size={18} className="coupon-icon" />
                  <h4>Avail Offers & Coupons</h4>
                </div>

                {activeCoupon ? (
                  <div className="applied-coupon-pill">
                    <div className="coupon-desc-col">
                      <span className="coupon-pill-code">{activeCoupon.code}</span>
                      <span className="coupon-pill-desc">{activeCoupon.description}</span>
                    </div>
                    <button className="remove-coupon-btn" onClick={removeCoupon}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <input
                      type="text"
                      placeholder="Enter promo (e.g. BLINK50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="submit" className="coupon-apply-btn">
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="coupon-error-msg">{couponError}</p>}
                {!activeCoupon && (
                  <div className="coupon-suggestions">
                    <span className="coupon-tip" onClick={() => setCouponCode('BLINK50')}>
                      Use <strong>BLINK50</strong> (₹50 off on ₹200+)
                    </span>
                    <span className="coupon-tip" onClick={() => setCouponCode('FREEGROW')}>
                      Use <strong>FREEGROW</strong> (Free Delivery on ₹150+)
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery Details Note */}
              <div className="delivery-instruction-card">
                <div className="instruction-header">
                  <ClipboardList size={16} className="instr-icon" />
                  <h4>Delivery Instructions</h4>
                </div>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Leave at gate / Drop at door (No-contact delivery)</span>
                </label>
              </div>

              {/* Bill Details */}
              <div className="bill-details-card">
                <h4 className="bill-header">Bill Details</h4>
                <div className="bill-row">
                  <span className="bill-label">Item Total</span>
                  <span className="bill-val">₹{itemTotal}</span>
                </div>
                <div className="bill-row">
                  <span className="bill-label">Delivery Partner Fee</span>
                  <span className="bill-val">
                    {deliveryFee === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="bill-row">
                  <span className="bill-label">Handling Charges</span>
                  <span className="bill-val">₹{handlingFee}</span>
                </div>
                {discount > 0 && (
                  <div className="bill-row discount">
                    <span className="bill-label">Promo Discount</span>
                    <span className="bill-val">-₹{discount}</span>
                  </div>
                )}
                <hr className="bill-divider" />
                <div className="bill-row grand-total-row">
                  <span className="bill-label">Grand Total</span>
                  <span className="bill-val">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="footer-address-bar" onClick={onOpenAddress}>
              <MapPin size={16} className="footer-pin" />
              <span className="footer-address-text">
                {address ? `Deliver to: ${address.substring(0, 35)}...` : 'Select delivery address to proceed'}
              </span>
              <ChevronRight size={14} className="footer-arrow" />
            </div>

            <button className="checkout-cta-btn" onClick={handleCheckoutClick}>
              <div className="cta-price-col">
                <span className="cta-price">₹{grandTotal}</span>
                <span className="cta-label">TOTAL BILL</span>
              </div>
              <div className="cta-action-col">
                <span>
                  {!user
                    ? 'Login to Checkout'
                    : !address
                    ? 'Add Delivery Address'
                    : 'Proceed to Pay'}
                </span>
                <ChevronRight size={16} />
              </div>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .cart-drawer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 440px;
          max-width: 100%;
          background-color: #f4f6fa;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          z-index: 1010;
        }

        .drawer-header {
          height: var(--header-height);
          background-color: var(--white);
          border-bottom: 1px solid var(--border-color);
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .header-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-bag-icon {
          color: var(--brand-green);
        }

        .header-title-row h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .header-item-count {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-grey);
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .drawer-close-btn:hover {
          background-color: var(--bg-light);
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        /* Empty state */
        .empty-cart-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 24px;
          height: 80%;
        }

        .empty-cart-graphic {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .empty-cart-state h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-dark);
        }

        .empty-cart-state p {
          font-size: 13px;
          color: var(--text-grey);
          margin-bottom: 24px;
        }

        .empty-cart-btn {
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .empty-cart-btn:hover {
          background-color: var(--brand-green-hover);
        }

        /* Active cart content */
        .cart-delivery-banner {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          box-shadow: var(--shadow-sm);
        }

        .banner-pulse-dot {
          width: 8px;
          height: 8px;
          background-color: var(--brand-green);
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(12, 131, 31, 0.2);
          animation: pulseBorder 1.5s infinite;
        }

        .banner-text-column {
          display: flex;
          flex-direction: column;
        }

        .banner-headline {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .banner-subline {
          font-size: 11px;
          color: var(--text-grey);
        }

        .items-list-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .cart-item-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .cart-item-img {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 4px;
        }

        .cart-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cart-item-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 2px;
          line-height: 1.3;
        }

        .cart-item-weight {
          font-size: 11px;
          color: var(--text-light);
          margin-bottom: 4px;
        }

        .cart-item-price-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-item-price {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .cart-item-discount {
          font-size: 10px;
          font-weight: 700;
          color: #2563eb;
          background-color: #eff6ff;
          padding: 1px 4px;
          border-radius: 4px;
        }

        .cart-item-adjuster {
          display: flex;
          align-items: center;
          background-color: var(--brand-green);
          color: var(--white);
          border-radius: var(--radius-sm);
          height: 28px;
          width: 64px;
          overflow: hidden;
          justify-content: space-between;
        }

        .cart-adjust-btn {
          background: none;
          border: none;
          color: var(--white);
          width: 20px;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-qty-val {
          font-size: 12px;
          font-weight: 700;
        }

        .cart-item-total {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-dark);
          min-width: 48px;
          text-align: right;
        }

        /* Offers and Coupons */
        .coupon-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 12px;
        }

        .coupon-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .coupon-icon {
          color: var(--brand-yellow);
        }

        .coupon-header-row h4 {
          font-size: 14px;
          font-weight: 700;
        }

        .coupon-form {
          display: flex;
          gap: 10px;
        }

        .coupon-input {
          flex: 1;
          height: 38px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0 12px;
          font-size: 13px;
          font-weight: 600;
          outline: none;
        }

        .coupon-input:focus {
          border-color: var(--brand-yellow);
        }

        .coupon-apply-btn {
          background-color: var(--brand-green-light);
          color: var(--brand-green);
          border: 1px solid var(--brand-green);
          font-weight: 700;
          font-size: 12px;
          padding: 0 16px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .coupon-apply-btn:hover {
          background-color: var(--brand-green);
          color: var(--white);
        }

        .applied-coupon-pill {
          background-color: #ecfdf5;
          border: 1px dashed #10b981;
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .coupon-desc-col {
          display: flex;
          flex-direction: column;
        }

        .coupon-pill-code {
          font-size: 12px;
          font-weight: 800;
          color: #065f46;
        }

        .coupon-pill-desc {
          font-size: 11px;
          color: #047857;
          margin-top: 1px;
        }

        .remove-coupon-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }

        .coupon-error-msg {
          font-size: 11px;
          color: #ef4444;
          font-weight: 500;
          margin-top: 6px;
        }

        .coupon-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 10px;
        }

        .coupon-tip {
          font-size: 11px;
          color: var(--text-grey);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .coupon-tip:hover {
          background-color: var(--bg-light);
        }

        .delivery-instruction-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 12px;
        }

        .instruction-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .instr-icon {
          color: var(--text-grey);
        }

        .instruction-header h4 {
          font-size: 14px;
          font-weight: 700;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-grey);
          font-weight: 500;
          cursor: pointer;
        }

        /* Bill Details styles */
        .bill-details-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 12px;
        }

        .bill-header {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 12px;
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-grey);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .bill-row.discount {
          color: #10b981;
          font-weight: 600;
        }

        .free-tag {
          color: var(--brand-green);
          font-weight: 700;
          background-color: var(--brand-green-light);
          padding: 1px 4px;
          border-radius: 4px;
        }

        .bill-divider {
          border: 0;
          border-top: 1px solid var(--border-color);
          margin: 10px 0;
        }

        .grand-total-row {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 0;
        }

        /* Sticky Drawer Footer */
        .drawer-footer {
          background-color: var(--white);
          border-top: 1px solid var(--border-color);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
        }

        .footer-address-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: background-color 0.2s;
        }

        .footer-address-bar:hover {
          background-color: var(--bg-light);
        }

        .footer-pin {
          color: var(--brand-green);
        }

        .footer-address-text {
          flex: 1;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-grey);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .footer-arrow {
          color: var(--text-light);
        }

        .checkout-cta-btn {
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          border-radius: var(--radius-md);
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          box-shadow: 0 4px 14px rgba(12, 131, 31, 0.3);
        }

        .checkout-cta-btn:hover {
          background-color: var(--brand-green-hover);
        }

        .cta-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .cta-price {
          font-size: 15px;
          font-weight: 800;
          line-height: 1;
        }

        .cta-label {
          font-size: 9px;
          font-weight: 700;
          opacity: 0.8;
          margin-top: 2px;
        }

        .cta-action-col {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 480px) {
          .cart-drawer {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
