import React, { useState, useEffect } from 'react';
import { Check, MapPin, Bike, ShoppingBag, Clock, Navigation } from 'lucide-react';

export default function CheckoutSuccess({ orderDetails, onClose }) {
  const [timeLeft, setTimeLeft] = useState(540); // 9 minutes in seconds
  const [scooterProgress, setScooterProgress] = useState(10); // Percent progress of scooter

  useEffect(() => {
    // Timer Countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Scooter Progress Simulation
    const progressTimer = setInterval(() => {
      setScooterProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressTimer);
          return 95;
        }
        return prev + 0.5;
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMilestoneClass = (activeTimeLimit) => {
    // 540s total. Active limit represents threshold of progress
    const elapsed = 540 - timeLeft;
    if (elapsed >= activeTimeLimit) return 'completed';
    if (elapsed + 30 >= activeTimeLimit) return 'current';
    return 'pending';
  };

  return (
    <div className="checkout-success-overlay animate-fade">
      <div className="checkout-success-container animate-slide-up">
        {/* Top Success Banner */}
        <div className="success-header">
          <div className="success-check-badge">
            <Check size={28} className="check-icon" />
          </div>
          <h2>Order Placed Successfully!</h2>
          <p className="order-id-label">Order ID: #BK-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>

        {/* Live Delivery Tracker Box */}
        <div className="delivery-tracker-card">
          <div className="tracker-header">
            <div className="tracker-time-col">
              <span className="arriving-label">Arriving in</span>
              <span className="countdown-clock">
                <Clock size={18} />
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="rider-assign-col">
              <span className="partner-label">Delivery Partner</span>
              <span className="partner-name">Amit Kumar (★ 4.9)</span>
            </div>
          </div>

          {/* Animated Map Representation */}
          <div className="mock-map-track">
            <div className="map-road-line">
              {/* Animated progress overlay */}
              <div className="map-road-progress" style={{ width: `${scooterProgress}%` }}></div>

              {/* Store Point */}
              <div className="map-node store completed">
                <ShoppingBag size={12} className="node-icon" />
                <span className="node-lbl">Store</span>
              </div>

              {/* Scooter Marker */}
              <div className="scooter-marker" style={{ left: `${scooterProgress}%` }}>
                <Bike size={18} className="scooter-icon" />
                <span className="scooter-ping"></span>
              </div>

              {/* Home Point */}
              <div className="map-node home pending">
                <MapPin size={12} className="node-icon" />
                <span className="node-lbl">Home</span>
              </div>
            </div>
          </div>

          {/* Milestones Checklist */}
          <div className="milestones-checklist">
            <div className={`milestone-step ${getMilestoneClass(0)}`}>
              <div className="step-bullet">✓</div>
              <div className="step-info">
                <span className="step-title">Order Confirmed</span>
                <span className="step-desc">Payment received, order sent to store</span>
              </div>
            </div>

            <div className={`milestone-step ${getMilestoneClass(60)}`}>
              <div className="step-bullet">✓</div>
              <div className="step-info">
                <span className="step-title">Order Packed</span>
                <span className="step-desc">Packed with care at local dark store</span>
              </div>
            </div>

            <div className={`milestone-step ${getMilestoneClass(120)}`}>
              <div className="step-bullet">✓</div>
              <div className="step-info">
                <span className="step-title">Out for Delivery</span>
                <span className="step-desc">Partner Amit Kumar is on the way to you</span>
              </div>
            </div>

            <div className={`milestone-step ${getMilestoneClass(480)}`}>
              <div className="step-bullet">✓</div>
              <div className="step-info">
                <span className="step-title">Arriving Shortly</span>
                <span className="step-desc">Delivery partner is near your location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="success-bill-summary">
          <div className="summary-section">
            <h4>Deliver to</h4>
            <p className="summary-text-address">
              {orderDetails.address || 'Your saved address'}
            </p>
          </div>
          <div className="summary-section text-right">
            <h4>Amount Paid</h4>
            <p className="summary-text-price">₹{orderDetails.amount || 0}</p>
            <span className="payment-method">Paid via Google Pay</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="success-close-btn" onClick={onClose}>
          Back to Home
        </button>
      </div>

      <style>{`
        .checkout-success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--white);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 24px;
        }

        .checkout-success-container {
          max-width: 520px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .success-check-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--brand-green-light);
          color: var(--brand-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 0 0 6px rgba(12, 131, 31, 0.08);
          animation: scaleUpCheck 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes scaleUpCheck {
          from {
            transform: scale(0.3);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-check-badge .check-icon {
          animation: drawCheck 0.3s 0.2s ease forwards;
        }

        .success-header h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .order-id-label {
          font-size: 12px;
          color: var(--text-light);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* Delivery Tracker Box */
        .delivery-tracker-card {
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 100%;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .tracker-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .tracker-time-col, .rider-assign-col {
          display: flex;
          flex-direction: column;
        }

        .rider-assign-col {
          text-align: right;
        }

        .arriving-label, .partner-label {
          font-size: 11px;
          color: var(--text-light);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .countdown-clock {
          font-size: 20px;
          font-weight: 800;
          color: var(--brand-green);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .partner-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-dark);
        }

        /* Animated map tracker styling */
        .mock-map-track {
          height: 80px;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          padding: 0 40px;
          position: relative;
          margin-bottom: 24px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .map-road-line {
          width: 100%;
          height: 6px;
          background-color: var(--bg-light);
          border-radius: 3px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .map-road-progress {
          height: 100%;
          background-color: var(--brand-green-light);
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 3px;
        }

        .map-node {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--bg-light);
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 2;
          color: var(--text-light);
        }

        .map-node.completed {
          background-color: var(--brand-green-light);
          border-color: var(--brand-green);
          color: var(--brand-green);
        }

        .map-node.store {
          left: -12px;
        }

        .map-node.home {
          right: -12px;
        }

        .node-icon {
          width: 10px;
          height: 10px;
        }

        .node-lbl {
          position: absolute;
          top: 30px;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-grey);
        }

        .scooter-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          top: 3px;
          z-index: 5;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--brand-green);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(12, 131, 31, 0.4);
          transition: left 0.5s ease-out;
        }

        .scooter-icon {
          transform: scaleX(-1); /* Make bike face forward (right) */
        }

        .scooter-ping {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--brand-green);
          opacity: 0.4;
          animation: mapPing 1.5s infinite;
          z-index: -1;
        }

        @keyframes mapPing {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        /* Milestones list */
        .milestones-checklist {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .milestone-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .step-bullet {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: var(--border-color);
          color: var(--white);
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          font-weight: 800;
        }

        .step-info {
          display: flex;
          flex-direction: column;
        }

        .step-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-light);
        }

        .step-desc {
          font-size: 11px;
          color: var(--text-light);
          margin-top: 1px;
        }

        /* Active milestone states */
        .milestone-step.completed .step-bullet {
          background-color: var(--brand-green);
        }
        .milestone-step.completed .step-title {
          color: var(--text-dark);
        }
        .milestone-step.completed .step-desc {
          color: var(--text-grey);
        }

        .milestone-step.current .step-bullet {
          background-color: var(--brand-yellow);
          box-shadow: 0 0 0 3px var(--brand-yellow-light);
        }
        .milestone-step.current .step-title {
          color: var(--text-dark);
          font-weight: 800;
        }
        .milestone-step.current .step-desc {
          color: var(--text-dark);
          font-weight: 500;
        }

        /* Bill Summary Info */
        .success-bill-summary {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          width: 100%;
          margin-bottom: 30px;
          gap: 16px;
        }

        .summary-section h4 {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-grey);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .summary-text-address {
          font-size: 12px;
          color: var(--text-dark);
          line-height: 1.4;
          font-weight: 500;
        }

        .summary-text-price {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-dark);
        }

        .payment-method {
          font-size: 10px;
          color: var(--brand-green);
          font-weight: 700;
        }

        .text-right {
          text-align: right;
        }

        .success-close-btn {
          background-color: var(--text-dark);
          color: var(--white);
          border: none;
          height: 48px;
          width: 100%;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
          box-shadow: var(--shadow-sm);
        }

        .success-close-btn:hover {
          background-color: #333333;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
