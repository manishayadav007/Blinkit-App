import React, { useState } from 'react';
import { X, MapPin, Compass, Briefcase, Home, Shield } from 'lucide-react';

export default function AddressModal({ onClose, onSelectAddress }) {
  const [customAddress, setCustomAddress] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState('');

  const quickAddresses = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      value: 'Apartment 402, Block C, Silver Oak Residency, Sector 56, Gurugram, Haryana - 122011'
    },
    {
      id: 'work',
      label: 'Office',
      icon: Briefcase,
      value: '6th Floor, Building 10C, Cyber Hub, DLF Phase 3, Sector 24, Gurugram, Haryana - 122002'
    }
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customAddress.trim().length < 10) {
      setError('Please enter a detailed delivery address (min 10 characters)');
      return;
    }
    onSelectAddress(customAddress);
    onClose();
  };

  const handleDetectLocation = () => {
    setDetecting(true);
    setError('');
    // Simulate geolocation lookup delay
    setTimeout(() => {
      setDetecting(false);
      const simulatedAddress = 'House 184, Lane 3, Sector 45, Near Huda Market, Gurugram, Haryana - 122003';
      onSelectAddress(simulatedAddress);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content address-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="address-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="address-modal-header">
          <h3>Choose delivery location</h3>
          <p>Enter your address details to check product availability and delivery time</p>
        </div>

        <div className="address-modal-body">
          {/* Geolocation trigger */}
          <button
            type="button"
            className="detect-location-btn"
            onClick={handleDetectLocation}
            disabled={detecting}
          >
            <Compass size={18} className={detecting ? 'spin-icon' : ''} />
            <span>{detecting ? 'Detecting location...' : 'Detect my current location'}</span>
          </button>

          <div className="address-separator">
            <span className="separator-line"></span>
            <span className="separator-text">or choose saved address</span>
            <span className="separator-line"></span>
          </div>

          {/* Quick Select Addresses */}
          <div className="quick-addresses-list">
            {quickAddresses.map((addr) => {
              const Icon = addr.icon;
              return (
                <div
                  key={addr.id}
                  className="quick-addr-card"
                  onClick={() => {
                    onSelectAddress(addr.value);
                    onClose();
                  }}
                >
                  <div className="quick-addr-icon-box">
                    <Icon size={16} />
                  </div>
                  <div className="quick-addr-info">
                    <span className="quick-addr-label">{addr.label}</span>
                    <span className="quick-addr-text">{addr.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="address-separator">
            <span className="separator-line"></span>
            <span className="separator-text">or enter manually</span>
            <span className="separator-line"></span>
          </div>

          {/* Custom Address Input */}
          <form onSubmit={handleCustomSubmit} className="manual-address-form">
            <div className="textarea-wrapper">
              <MapPin size={18} className="textarea-pin" />
              <textarea
                placeholder="Flat / House / Office No., Building Name, Street Address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="address-textarea"
                rows={3}
                required
              />
            </div>
            {error && <p className="address-error-text">{error}</p>}
            <button type="submit" className="address-submit-btn">
              Save Address & Proceed
            </button>
          </form>
        </div>

        {/* Security Footer */}
        <div className="address-modal-footer">
          <Shield size={14} className="safety-icon" />
          <span>Your location information is secure & only used for delivery.</span>
        </div>
      </div>

      <style>{`
        .address-modal-content {
          max-width: 440px;
          display: flex;
          flex-direction: column;
        }

        .address-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: none;
          border: none;
          color: var(--text-grey);
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .address-modal-close:hover {
          background-color: var(--bg-light);
        }

        .address-modal-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .address-modal-header h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .address-modal-header p {
          font-size: 12px;
          color: var(--text-grey);
          line-height: 1.4;
        }

        .address-modal-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .detect-location-btn {
          background-color: var(--white);
          color: var(--brand-green);
          border: 1px solid var(--brand-green);
          height: 44px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .detect-location-btn:hover {
          background-color: var(--brand-green-light);
        }

        .spin-icon {
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .address-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 4px 0;
        }

        .separator-line {
          flex: 1;
          height: 1px;
          background-color: var(--border-color);
        }

        .separator-text {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .quick-addresses-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quick-addr-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background-color: #fafafa;
        }

        .quick-addr-card:hover {
          border-color: var(--brand-yellow);
          background-color: var(--brand-yellow-light);
        }

        .quick-addr-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-grey);
          flex-shrink: 0;
        }

        .quick-addr-card:hover .quick-addr-icon-box {
          border-color: var(--brand-yellow);
          color: var(--text-dark);
        }

        .quick-addr-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .quick-addr-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .quick-addr-text {
          font-size: 11px;
          color: var(--text-grey);
          margin-top: 2px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .manual-address-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .textarea-wrapper {
          position: relative;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background-color: #fafafa;
          padding: 10px 12px;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .textarea-wrapper:focus-within {
          border-color: var(--brand-yellow);
          background-color: var(--white);
        }

        .textarea-pin {
          color: var(--text-light);
          margin-top: 2px;
        }

        .address-textarea {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-dark);
          resize: none;
          outline: none;
          font-family: inherit;
        }

        .address-error-text {
          font-size: 11px;
          color: #ef4444;
          font-weight: 500;
        }

        .address-submit-btn {
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          height: 44px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .address-submit-btn:hover {
          background-color: var(--brand-green-hover);
        }

        .address-modal-footer {
          padding: 14px 24px;
          background-color: #fafafa;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: var(--text-light);
        }

        .safety-icon {
          color: #10b981;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
