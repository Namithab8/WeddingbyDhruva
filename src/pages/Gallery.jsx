import React from 'react';

const PHOTOS = [
  'Grand ballroom reception', 'Garden ceremony aisle', 'Candlelit dinner tablescape',
  'Bridal portrait in soft light', 'Floral installation arch', 'Destination beach vows',
  'Mehndi celebration decor', 'Sangeet stage design', 'Luxury welcome dinner',
  'Sparkler exit at dusk',
];

export default function Gallery() {
  return (
    <section className="page">
      <header className="page-head">
        <small>A FEW MOMENTS</small>
        <h1>Gallery</h1>
        <p>Fragments of celebrations we have designed and loved.</p>
      </header>
      <div className="gallery-grid">
        {PHOTOS.map((label, i) => (
          <figure className={`gallery-card g${i % 3}`} key={label}>
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
