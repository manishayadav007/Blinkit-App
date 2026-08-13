import React from 'react';
import { X, Clock, Plus, Minus } from 'lucide-react';

export default function ProductModal({ product, cartItem, onAddToCart, onRemoveFromCart, onClose }) {
  if (!product) return null;

  const quantity = cartItem ? cartItem.quantity : 0;
  const hasDiscount = product.discount && product.discount !== '0% OFF';

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="product-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Image */}
          <div className="modal-image-column">
            <img src={product.image} alt={product.name} className="modal-product-image" />
            {hasDiscount && <div className="modal-discount-tag">{product.discount}</div>}
          </div>

          {/* Right Column: Information */}
          <div className="modal-info-column">
            <span className="modal-category">{product.category.toUpperCase()}</span>
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-meta-row">
              <span className="modal-weight">{product.weight}</span>
              <span className="modal-speed">
                <Clock size={12} />
                {product.time}
              </span>
            </div>

            <hr className="modal-divider" />

            {/* Pricing Section */}
            <div className="modal-price-section">
              <div className="modal-price-info">
                <span className="modal-current-price">₹{product.price}</span>
                {hasDiscount && (
                  <span className="modal-original-price">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Action Button */}
              <div className="modal-action-btn-container">
                {quantity === 0 ? (
                  <button className="modal-add-btn" onClick={() => onAddToCart(product)}>
                    <span>ADD TO CART</span>
                    <Plus size={16} />
                  </button>
                ) : (
                  <div className="modal-qty-adjuster">
                    <button className="modal-adjust-btn" onClick={() => onRemoveFromCart(product.id)}>
                      <Minus size={14} />
                    </button>
                    <span className="modal-qty-display">{quantity}</span>
                    <button className="modal-adjust-btn" onClick={() => onAddToCart(product)}>
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr className="modal-divider" />

            {/* Product description */}
            <div className="modal-details-section">
              <h4 className="details-header">Product Description</h4>
              <p className="details-text">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.details && (
              <div className="modal-details-section">
                <h4 className="details-header">Product Information</h4>
                <div className="specifications-table">
                  {Object.entries(product.details).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-modal-content {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          max-width: 820px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: var(--shadow-lg);
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background-color: var(--bg-light);
          border: none;
          color: var(--text-dark);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s;
        }

        .modal-close-btn:hover {
          background-color: #e5e7eb;
          transform: rotate(90deg);
        }

        .product-modal-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          min-height: 500px;
        }

        .modal-image-column {
          padding: 40px;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-right: 1px solid var(--border-color);
        }

        .modal-product-image {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
        }

        .modal-discount-tag {
          position: absolute;
          top: 24px;
          left: 24px;
          background-color: #2563eb;
          color: var(--white);
          font-size: 12px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .modal-info-column {
          padding: 40px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .modal-category {
          font-size: 11px;
          font-weight: 800;
          color: var(--brand-green);
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .modal-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .modal-weight {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-grey);
        }

        .modal-speed {
          background-color: var(--bg-light);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-dark);
        }

        .modal-divider {
          border: 0;
          border-top: 1px solid var(--border-color);
          margin: 16px 0;
        }

        .modal-price-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-price-info {
          display: flex;
          flex-direction: column;
        }

        .modal-current-price {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-dark);
        }

        .modal-original-price {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-light);
          text-decoration: line-through;
        }

        .modal-action-btn-container {
          min-width: 140px;
          height: 42px;
        }

        .modal-add-btn {
          width: 100%;
          height: 100%;
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 10px rgba(12, 131, 31, 0.2);
          transition: all 0.2s;
        }

        .modal-add-btn:hover {
          background-color: var(--brand-green-hover);
          transform: translateY(-1px);
        }

        .modal-qty-adjuster {
          width: 100%;
          height: 100%;
          background-color: var(--brand-green);
          color: var(--white);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          font-size: 15px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(12, 131, 31, 0.2);
        }

        .modal-adjust-btn {
          background: none;
          border: none;
          color: var(--white);
          width: 44px;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .modal-adjust-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .modal-qty-display {
          flex: 1;
          text-align: center;
        }

        .modal-details-section {
          margin-bottom: 20px;
        }

        .details-header {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .details-text {
          font-size: 13px;
          color: var(--text-grey);
          line-height: 1.6;
        }

        .specifications-table {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .spec-row {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          font-size: 12px;
        }

        .spec-row:last-child {
          border-bottom: none;
        }

        .spec-label {
          width: 120px;
          background-color: var(--bg-light);
          padding: 10px 14px;
          font-weight: 600;
          color: var(--text-grey);
          border-right: 1px solid var(--border-color);
        }

        .spec-value {
          flex: 1;
          padding: 10px 14px;
          color: var(--text-dark);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-image-column {
            padding: 24px;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
          .modal-product-image {
            max-height: 250px;
          }
          .modal-info-column {
            padding: 24px;
          }
          .modal-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
