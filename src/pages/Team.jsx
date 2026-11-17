import React from 'react';

const TEAM = [
  { name: 'Aarav Mehta', role: 'Founder & Creative Director', bio: 'Leads the creative vision behind every Dhruva celebration.' },
  { name: 'Diya Kapoor', role: 'Head of Wedding Planning', bio: 'Ensures every detail unfolds flawlessly, from first call to final farewell.' },
  { name: 'Rohan Iyer', role: 'Design Lead', bio: 'Crafts immersive spaces where architecture, florals and light converge.' },
  { name: 'Sara D\'Souza', role: 'Client Experience Manager', bio: 'Your dedicated point of contact, guiding you through every step.' },
];

export default function Team() {
  return (
    <section className="page">
      <header className="page-head">
        <small>THE PEOPLE BEHIND DHURUVA</small>
        <h1>Our Team</h1>
        <p>A collective of designers, planners and storytellers devoted to your celebration.</p>
      </header>
      <div className="team-grid">
        {TEAM.map((m) => (
          <article className="team-card" key={m.name}>
            <div className="team-photo" aria-hidden="true">{m.name.split(' ').map((w) => w[0]).join('')}</div>
            <h3>{m.name}</h3>
            <span className="team-role">{m.role}</span>
            <p>{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
