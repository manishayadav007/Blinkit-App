import React from 'react';
import * as Icons from 'lucide-react';

export default function CategoryList({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-section">
      <h3 className="section-title">Shop by Category</h3>
      <div className="category-grid">
        {categories.map((cat) => {
          // Dynamic icon loading from lucide-react
          const IconComponent = Icons[cat.icon] || Icons.Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              className={`category-item-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-icon-wrapper">
                <IconComponent size={28} className="cat-icon" />
              </div>
              <span className="category-name">{cat.name}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .category-section {
          margin-bottom: 36px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-dark);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 16px;
        }

        .category-item-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px 8px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          user-select: none;
          text-align: center;
        }

        .category-item-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-yellow);
          box-shadow: var(--shadow-md);
        }

        .category-item-card.active {
          border-color: var(--brand-green);
          background-color: var(--brand-green-light);
        }

        .category-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }

        .category-item-card:hover .category-icon-wrapper {
          background-color: var(--brand-yellow-light);
        }

        .category-item-card.active .category-icon-wrapper {
          background-color: var(--white);
        }

        .cat-icon {
          color: var(--text-dark);
          transition: transform 0.2s;
        }

        .category-item-card:hover .cat-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .category-item-card.active .cat-icon {
          color: var(--brand-green);
        }

        .category-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.3;
        }

        @media (max-width: 640px) {
          .category-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }
          .category-item-card {
            padding: 10px 4px;
          }
          .category-icon-wrapper {
            width: 42px;
            height: 42px;
          }
          .cat-icon {
            width: 22px;
            height: 22px;
          }
          .category-name {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
