import React from 'react';

const DESTINATIONS = [
  { name: 'Udaipur', desc: 'Palace weddings beside Lake Pichola, where heritage and romance converge.' },
  { name: 'Jaipur', desc: 'Desert-fort celebrations under starlit skies and regal amber light.' },
  { name: 'Goa', desc: 'Sunset beach vows and breezy coastal receptions.' },
  { name: 'Kerala', desc: 'Backwater ceremonies surrounded by emerald greenery.' },
  { name: 'Uttarakhand', desc: 'Mountain-top mandaps with the Himalayas as your backdrop.' },
  { name: 'International', desc: 'From Santorini to Swiss Alps — we plan celebrations anywhere.' },
];

export default function Destinations() {
  return (
    <section className="page">
      <header className="page-head">
        <small>WHERE WE CELEBRATE</small>
        <h1>Destinations</h1>
        <p>From local celebrations to international dream weddings, we navigate the world to find your perfect backdrop.</p>
      </header>
      <div className="dest-grid">
        {DESTINATIONS.map((d) => (
          <article className="dest-card" key={d.name}>
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
