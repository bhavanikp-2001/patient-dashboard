import React from 'react';
import { ShieldCheck, Lock, CheckSquare, FileText, Cloud, Smartphone } from 'lucide-react';

export const FooterBadges = () => {
  return (
    <footer className="footer-badges-container">
      <div className="footer-badge-item">
        <ShieldCheck size={16} />
        <span>Role-Based Access Control</span>
      </div>

      <div className="footer-badge-item">
        <Lock size={16} />
        <span>Data Encryption & JWT</span>
      </div>

      <div className="footer-badge-item">
        <CheckSquare size={16} />
        <span>Input Validation</span>
      </div>

      <div className="footer-badge-item">
        <FileText size={16} />
        <span>Audit Logs</span>
      </div>

      <div className="footer-badge-item">
        <Cloud size={16} />
        <span>Docker + Cloud Deployment</span>
      </div>

      <div className="footer-badge-item">
        <Smartphone size={16} />
        <span>Responsive Design</span>
      </div>
    </footer>
  );
};
