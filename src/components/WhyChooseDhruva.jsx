import React from 'react';

const USUAL = [
  'Managing multiple vendors and phone numbers.',
  'Unexpected changes in budgets.',
  'Uncertainty about the final decoration.',
  'Managing timelines and coordination.',
  'Too many responsibilities on your wedding day.',
];

const DHRUVA = [
  'One dedicated team for your celebration.',
  'Clear budgets and transparent planning.',
  'Beautiful designs planned in advance.',
  'Professional coordination and execution.',
  'Enjoy your celebration while we manage the details.',
];

export default function WhyChooseDhruva() {
  return (
    <section className="why-choose">
      <div className="wc2-head">
        <span className="wc2-eyebrow">Why Weddings by Dhruva</span>
        <h2>Planning a celebration shouldn't feel like a second job</h2>
        <p>Every headache of the usual way, redesigned into one accountable production.</p>
      </div>
      <div className="wc2-cards">
        <div className="wc2-card usual">
          <h3>THE USUAL WAY</h3>
          <ul>
            {USUAL.map((t) => (
              <li key={t}>
                <span className="wc2-icon cross">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="wc2-arrow" aria-hidden="true">
          <span>➜</span>
        </div>
        <div className="wc2-card dhruva">
          <h3>THE DHRUVA WAY</h3>
          <ul>
            {DHRUVA.map((t) => (
              <li key={t}>
                <span className="wc2-icon check">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
