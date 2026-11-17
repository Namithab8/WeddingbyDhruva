import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_MENU } from './servicesMenuData.js';
import ServiceCategory from './ServiceCategory.jsx';
import './ServicesDropdown.css';

export default function ServicesDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      className="nav-dropdown"
      ref={wrapRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav nav-services ${open ? 'open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        OUR SERVICES
        <span className={`dd-arrow ${open ? 'up' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="services-panel" role="menu">
          <div className="services-panel-head">
            <span className="services-panel-title">OUR SERVICES</span>
            <button
              type="button"
              className="services-all"
              onClick={() => navigate('/services')}
            >
              View All →
            </button>
          </div>
          <div className="services-list">
            {SERVICES_MENU.map((cat) => (
              <ServiceCategory key={cat.num} category={cat} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
