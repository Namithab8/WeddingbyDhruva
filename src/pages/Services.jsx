import React from 'react';

const SERVICES = [
  { title: 'Wedding Planning', desc: 'End-to-end planning that turns your vision into a seamless celebration — budgeting, timelines and vendor curation.' },
  { title: 'Wedding Design', desc: 'Conceptual spaces and aesthetic direction, from moodboards to fully realised installations and tablescapes.' },
  { title: 'Event Decoration', desc: 'Bespoke florals, lighting, draping and décor crafted to reflect your story and elevate every venue.' },
  { title: 'Wedding Coordination', desc: 'On-the-day management that keeps every moment flowing beautifully, so you stay present throughout.' },
];

export default function Services() {
  return (
    <section className="page">
      <header className="page-head">
        <small>WHAT WE DO</small>
        <h1>Our Services</h1>
        <p>Full-service wedding design and planning, tailored to celebrations of every scale.</p>
      </header>
      <div className="service-grid">
        {SERVICES.map((s, i) => (
          <article className="service-card" key={s.title}>
            <span className="service-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-line" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
