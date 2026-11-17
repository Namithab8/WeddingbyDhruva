import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'DREAM & DISCOVER',
    text: 'We understand your vision, guest count, preferences, dates, and budget to begin planning your celebration.',
    side: 'left',
  },
  {
    num: '02',
    title: 'DESIGN & DECIDE',
    text: 'Our design team transforms your ideas into beautiful concepts. Review and approve the designs before execution.',
    side: 'right',
  },
  {
    num: '03',
    title: 'CELEBRATE',
    text: 'Our experienced team coordinates every detail so you can relax and enjoy your special day.',
    side: 'left',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="hiw-head">
        <div className="hiw-head-text">
          <span className="wc2-eyebrow">How It Works</span>
          <h2>Three steps between today and your dream wedding</h2>
        </div>
      </div>
      <div className="hiw-timeline">
        <div className="hiw-line" aria-hidden="true"></div>
        {STEPS.map((s) => (
          <div className={`hiw-step ${s.side}`} key={s.num}>
            <div className="hiw-marker">
              <span className="hiw-num">{s.num}</span>
            </div>
            <div className="hiw-content">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
