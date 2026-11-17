import React from 'react';
import { NavLink } from 'react-router-dom';

const USEFUL_LINKS = [
  ['Home', '/'],
  ['Team', '/team'],
  ['Gallery', '/gallery'],
  ['Contact Us', '/contact'],
  ['Wedding Atelier', '/media'],
];

const MAIN_LINKS = [
  ['Wedding Planning', '/services'],
  ['Guest Experience', '/services'],
  ['Design Studio', '/services'],
  ['Cities & Destinations', '/destinations'],
  ['Contact Us', '/contact'],
];

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/weddingsbydhruva' },
  { name: 'Instagram', href: 'https://www.instagram.com/WEDDINGSBYDHRUVAA' },
  { name: 'YouTube', href: 'https://www.youtube.com/@weddingbydhruva' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Weddings by Dhruva</span>
          <p>
            Weddings by Dhruva was conceived out of a desire to
            inspire people to live out their fantasy by creating dream weddings.
          </p>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            {USEFUL_LINKS.map(([name, to]) => (
              <li key={name}>
                <NavLink to={to} end={to === '/'}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Main Links</h4>
          <ul>
            {MAIN_LINKS.map(([name, to]) => (
              <li key={name}>
                <NavLink to={to}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social Links</h4>
          <div className="footer-social-links footer-social-col">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                {...(s.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e) => e.preventDefault() })}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Weddings by Dhruva</span>
        <span>Skyblue Event Management India Pvt. Ltd.</span>
      </div>
    </footer>
  );
}