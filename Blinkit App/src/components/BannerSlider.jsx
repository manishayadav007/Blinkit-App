import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Fresh Fruits & Vegetables',
      subtitle: 'Get up to 25% OFF on farm-fresh organic produce',
      badge: 'SEASON\'S SPECIAL',
      cta: 'Order Now',
      gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
      illustration: '🍎🥦🍇',
      textColor: '#ffffff'
    },
    {
      id: 2,
      title: 'Dairy & Breakfast Deals',
      subtitle: 'Fresh milk, butter, and farm eggs delivered in 9 minutes',
      badge: 'DAILY ESSENTIALS',
      cta: 'Shop Breakfast',
      gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      illustration: '🥛🧈🍳',
      textColor: '#ffffff'
    },
    {
      id: 3,
      title: 'Craving some Munchies?',
      subtitle: 'Flat ₹50 OFF on cold drinks, chips & sweet cravings',
      badge: 'PARTY DEALS',
      cta: 'Explore Snacks',
      gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      illustration: '🍿🥤🍫',
      textColor: '#ffffff'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="banner-slider">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slide-card"
            style={{ background: slide.gradient, color: slide.textColor }}
          >
            <div className="slide-content">
              <span className="slide-badge">{slide.badge}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="slide-cta">{slide.cta}</button>
            </div>
            <div className="slide-illustration">
              <span className="emoji-graphic">{slide.illustration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Controls */}
      <button className="slider-nav-btn prev" onClick={prevSlide}>
        <ChevronLeft size={20} />
      </button>
      <button className="slider-nav-btn next" onClick={nextSlide}>
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <style>{`
        .banner-slider {
          position: relative;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: var(--shadow-sm);
        }

        .slides-container {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .slide-card {
          min-width: 100%;
          width: 100%;
          padding: 44px 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          min-height: 200px;
        }

        .slide-content {
          max-width: 60%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 2;
        }

        .slide-badge {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 6px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .slide-title {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .slide-subtitle {
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .slide-cta {
          background-color: var(--white);
          color: var(--text-dark);
          font-weight: 700;
          font-size: 14px;
          border: none;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slide-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .slide-illustration {
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .emoji-graphic {
          font-size: 72px;
          filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.15));
          animation: floatEmoji 3s ease-in-out infinite alternate;
        }

        @keyframes floatEmoji {
          0% {
            transform: translateY(-5px) rotate(0deg);
          }
          100% {
            transform: translateY(5px) rotate(5deg);
          }
        }

        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s, background-color 0.2s;
          z-index: 5;
        }

        .banner-slider:hover .slider-nav-btn {
          opacity: 0.9;
        }

        .slider-nav-btn:hover {
          background-color: var(--bg-light);
          opacity: 1;
        }

        .slider-nav-btn.prev {
          left: 12px;
        }

        .slider-nav-btn.next {
          right: 12px;
        }

        .slider-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot.active {
          width: 20px;
          border-radius: 4px;
          background-color: var(--white);
        }

        @media (max-width: 768px) {
          .slide-card {
            padding: 30px;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 16px;
          }
          .slide-content {
            max-width: 100%;
          }
          .slide-title {
            font-size: 26px;
          }
          .slide-subtitle {
            font-size: 14px;
            margin-bottom: 16px;
          }
          .slide-illustration {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
