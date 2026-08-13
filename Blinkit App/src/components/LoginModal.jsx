import React, { useState } from 'react';
import { X, Phone, Lock, Smartphone } from 'lucide-react';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Phone Number, 2 = OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');

    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 4 || !/^\d+$/.test(otp)) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: 'Rahul Sharma',
        phone: phoneNumber,
        email: 'rahul.sharma@example.com'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content login-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="login-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Top Graphic */}
        <div className="login-modal-graphic">
          <div className="brand-badge-circle">
            <Smartphone size={32} className="phone-icon-graphic" />
          </div>
          <h3>India's last minute app</h3>
          <p>Log in or Sign up to access your account details & order history</p>
        </div>

        {/* Form Body */}
        <div className="login-modal-body">
          {step === 1 ? (
            /* Step 1: Mobile Number */
            <form onSubmit={handleSendOtp} className="login-form">
              <div className="input-group">
                <span className="input-prefix">+91</span>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="login-input-field"
                  autoFocus
                  required
                />
              </div>
              {error && <p className="login-error-text">{error}</p>}
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Continue'}
              </button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="login-form">
              <span className="otp-sent-label">
                We've sent a 4-digit verification code to <strong>+91 {phoneNumber}</strong>
              </span>
              <div className="input-group">
                <span className="input-icon-lock">
                  <Lock size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="login-input-field code-input"
                  autoFocus
                  required
                />
              </div>
              {error && <p className="login-error-text">{error}</p>}
              <div className="otp-actions-row">
                <button type="button" className="otp-change-phone-btn" onClick={() => setStep(1)}>
                  Change Number
                </button>
                <button
                  type="button"
                  className="otp-resend-btn"
                  onClick={() => {
                    setError('OTP resent successfully! (Use any 4 digits to log in)');
                  }}
                >
                  Resend OTP
                </button>
              </div>
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Proceed'}
              </button>
            </form>
          )}
        </div>

        {/* T&C Footer */}
        <div className="login-modal-footer">
          By continuing, you agree to our <strong>Terms of Service</strong> & <strong>Privacy Policy</strong>
        </div>
      </div>

      <style>{`
        .login-modal-content {
          max-width: 380px;
          display: flex;
          flex-direction: column;
        }

        .login-modal-close {
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

        .login-modal-close:hover {
          background-color: var(--bg-light);
        }

        .login-modal-graphic {
          background-color: var(--brand-yellow-light);
          padding: 30px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-badge-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--brand-yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          color: var(--white);
          box-shadow: 0 4px 10px rgba(248, 203, 70, 0.3);
        }

        .login-modal-graphic h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .login-modal-graphic p {
          font-size: 11px;
          color: var(--text-grey);
          line-height: 1.4;
          max-width: 85%;
        }

        .login-modal-body {
          padding: 24px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: #fafafa;
          transition: border-color 0.2s;
        }

        .input-group:focus-within {
          border-color: var(--brand-yellow);
          background-color: var(--white);
        }

        .input-prefix {
          padding: 0 12px;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-dark);
          border-right: 1px solid var(--border-color);
        }

        .input-icon-lock {
          padding: 0 12px;
          color: var(--text-light);
        }

        .login-input-field {
          flex: 1;
          height: 42px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          padding: 0 12px;
          outline: none;
          color: var(--text-dark);
        }

        .code-input {
          letter-spacing: 4px;
          text-align: center;
          font-size: 16px;
        }

        .login-error-text {
          font-size: 11px;
          color: #ef4444;
          font-weight: 500;
          margin-top: -8px;
        }

        .otp-sent-label {
          font-size: 12px;
          color: var(--text-grey);
          line-height: 1.4;
        }

        .otp-actions-row {
          display: flex;
          justify-content: space-between;
          margin-top: -6px;
        }

        .otp-change-phone-btn, .otp-resend-btn {
          background: none;
          border: none;
          font-size: 11px;
          font-weight: 700;
          color: var(--brand-green);
          cursor: pointer;
        }

        .otp-change-phone-btn:hover, .otp-resend-btn:hover {
          color: var(--brand-green-hover);
        }

        .login-submit-btn {
          background-color: var(--brand-green);
          color: var(--white);
          border: none;
          height: 44px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-submit-btn:hover {
          background-color: var(--brand-green-hover);
        }

        .login-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-modal-footer {
          padding: 16px 24px;
          background-color: #fafafa;
          font-size: 10px;
          color: var(--text-light);
          text-align: center;
          border-top: 1px solid var(--border-color);
          line-height: 1.4;
        }

        .login-modal-footer strong {
          color: var(--text-grey);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
