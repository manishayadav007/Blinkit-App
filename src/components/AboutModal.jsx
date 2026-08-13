import React from 'react';
import { X, Info, Sparkles, Code, Cpu } from 'lucide-react';

export default function AboutModal({ onClose }) {
  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content about-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="about-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="about-modal-header">
          <div className="about-icon-circle">
            <Info size={28} className="info-icon" />
          </div>
          <h3>About Blinkit Clone</h3>
          <p>Version 1.0.0 • Developed with cutting-edge tools</p>
        </div>

        {/* Modal Body */}
        <div className="about-modal-body">
          <div className="about-intro">
            <p>
              This is a high-fidelity Blinkit Clone built using React, Vite, and custom CSS. 
              It provides a premium, blazing-fast grocery shopping experience with real-time cart computations, 
              simulated authentication, custom address updates, search filters, and checkout workflows.
            </p>
          </div>

          <div className="about-features-list">
            <div className="about-feature-item">
              <div className="feature-icon-box">
                <Sparkles size={16} />
              </div>
              <div className="feature-desc">
                <strong>AI-Generated High-Res Assets</strong>
                <span>All product assets are generated using state-of-the-art image generation models.</span>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="feature-icon-box">
                <Code size={16} />
              </div>
              <div className="feature-desc">
                <strong>Modern Architecture</strong>
                <span>Built using React functional components, hooks, local storage sync, and custom responsive CSS.</span>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="feature-icon-box">
                <Cpu size={16} />
              </div>
              <div className="feature-desc">
                <strong>Collaborative Development</strong>
                <span>Pair-programmed and refined with Antigravity AI to deliver maximum visual excellence and responsiveness.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="about-modal-footer">
          <span>Made with ❤️ by Antigravity AI & Developer</span>
        </div>
      </div>

      <style>{`
        .about-modal-content {
          max-width: 460px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .about-modal-close {
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

        .about-modal-close:hover {
          background-color: var(--bg-light);
        }

        .about-modal-header {
          background-color: var(--brand-yellow-light);
          padding: 28px 24px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .about-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background-color: var(--brand-yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          color: var(--white);
          box-shadow: 0 4px 10px rgba(248, 203, 70, 0.3);
        }

        .about-modal-header h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .about-modal-header p {
          font-size: 11px;
          color: var(--text-grey);
        }

        .about-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-intro {
          font-size: 13px;
          color: var(--text-grey);
          line-height: 1.5;
          text-align: justify;
        }

        .about-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-feature-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .feature-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background-color: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-green);
          flex-shrink: 0;
          border: 1px solid var(--border-color);
        }

        .feature-desc {
          display: flex;
          flex-direction: column;
        }

        .feature-desc strong {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .feature-desc span {
          font-size: 11px;
          color: var(--text-grey);
          line-height: 1.3;
          margin-top: 1px;
        }

        .about-modal-footer {
          padding: 14px 24px;
          background-color: #fafafa;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 10px;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
}
