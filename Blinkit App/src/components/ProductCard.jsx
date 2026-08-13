import React from 'react';
import { Plus, Minus, Clock } from 'lucide-react';

export default function ProductCard({ product, cartItem, onAddToCart, onRemoveFromCart, onClickCard }) {
  const quantity = cartItem ? cartItem.quantity : 0;
  const hasDiscount = product.discount && product.discount !== '0% OFF';

  return (
    <div className="product-card">
      {/* Discount Tag */}
      {hasDiscount && (
        <div className="discount-tag">
          {product.discount}
        </div>
      )}

      {/* Product Image & Delivery Speed */}
      <div className="image-container" onClick={() => onClickCard(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="delivery-speed-badge">
          <Clock size={10} />
          <span>{product.time}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details-area">
        <h4 className="product-title" onClick={() => onClickCard(product)}>
          {product.name}
        </h4>
        <span className="product-weight">{product.weight}</span>

        {/* Pricing & Add Trigger */}
        <div className="pricing-row">
          <div className="price-info">
            <span className="current-price">₹{product.price}</span>
            {hasDiscount && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          <div className="add-button-container">
            {quantity === 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
              >
                <span>ADD</span>
                <Plus size={14} />
              </button>
            ) : (
              <div className="quantity-adjuster">
                <button
                  className="adjust-btn minus"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromCart(product.id);
                  }}
                >
                  <Minus size={12} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="adjust-btn plus"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 12px;
          transition: all 0.2s ease-in-out;
          height: 100%;
        }

        .product-card:hover {
          box-shadow: var(--shadow-md);
          border-color: #d1d1d1;
          transform: translateY(-2px);
        }

        .discount-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background-color: #2563eb;
          color: var(--white);
          font-size: 9px;
          font-weight: 800;
          padding: 3px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          z-index: 5;
        }

        .image-container {
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          position: relative;
          cursor: pointer;
          background-color: #fafafa;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 12px;
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .delivery-speed-badge {
          position: absolute;
          bottom: 6px;
          left: 6px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(2px);
          color: var(--text-dark);
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .product-details-area {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.4;
          height: 38px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: pointer;
          margin-bottom: 4px;
        }

        .product-title:hover {
          color: var(--brand-green);
        }

        .product-weight {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-light);
          margin-bottom: 12px;
        }

        .pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .price-info {
          display: flex;
          flex-direction: column;
        }

        .current-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .original-price {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-light);
          text-decoration: line-through;
        }

        .add-button-container {
          min-width: 72px;
          height: 32px;
        }

        .add-to-cart-btn {
          width: 100%;
          height: 100%;
          background-color: var(--brand-green-light);
          color: var(--brand-green);
          border: 1px solid var(--brand-green);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.2s;
        }

        .add-to-cart-btn:hover {
          background-color: var(--brand-green);
          color: var(--white);
        }

        .quantity-adjuster {
          width: 100%;
          height: 100%;
          background-color: var(--brand-green);
          color: var(--white);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          font-size: 13px;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .adjust-btn {
          background: none;
          border: none;
          color: var(--white);
          width: 24px;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s;
        }

        .adjust-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .quantity-display {
          flex: 1;
          text-align: center;
          user-select: none;
        }

        @media (max-width: 640px) {
          .product-card {
            padding: 8px;
          }
          .product-title {
            font-size: 11px;
            height: 32px;
          }
          .product-weight {
            font-size: 10px;
            margin-bottom: 8px;
          }
          .current-price {
            font-size: 12px;
          }
          .original-price {
            font-size: 9px;
          }
          .add-button-container {
            min-width: 58px;
            height: 28px;
          }
          .add-to-cart-btn {
            font-size: 10px;
          }
          .quantity-adjuster {
            font-size: 11px;
          }
          .adjust-btn {
            width: 18px;
          }
        }
      `}</style>
    </div>
  );
}
