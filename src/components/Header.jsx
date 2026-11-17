import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  ['HOME', '/'],
  ['OUR TEAM', '/team'],
  ['OUR SERVICES', '/services'],
  ['GALLERY', '/gallery'],
  ['MEDIA', '/media'],
  ['CONTACT US', '/contact'],
];

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <button
        className="brand"
        onClick={() => { window.location.href = '/'; }}
        aria-label="Dhruva home"
      >
        <span
          className="brand-logo"
          style={{
            WebkitMaskImage: 'url(/image.png)',
            maskImage: 'url(/image.png)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      </button>
      <nav className="nav-list">
        {NAV.map(([name, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
