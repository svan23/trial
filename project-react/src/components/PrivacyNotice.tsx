import React from 'react';

const PrivacyNotice: React.FC = () => {
  // Custom styles using your theme colors
  const noticeStyle = {
    background: 'linear-gradient(to right, rgba(254, 210, 226, 0.15), rgba(233, 165, 241, 0.15))',
    borderLeft: '4px solid var(--color-tertiary)',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(198, 142, 253, 0.1)'
  };

  const iconStyle = {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <div 
      className="alert p-4 mb-4 text-center max-w-3xl mx-auto d-flex align-items-center justify-content-center" 
      style={noticeStyle}
    >
      <div className="d-flex align-items-center">
        <i 
          className="bi bi-shield-lock fs-4 me-3" 
          style={iconStyle}
        ></i>
        <p className="mb-0 fw-light" style={{ color: '#5D4A8A' }}>
          <span className="fw-medium">Privacy Assured:</span> Your images are processed securely and never stored on our servers. 
          All data is deleted immediately after analysis.
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;