import React from 'react';

const ARTICLES = [
  { category: 'Real Weddings', title: "The secret to keeping a wedding intimate but also grand." },
  { category: 'Planning Tips', title: 'The key magic to making your intimate wedding feel grand.' },
  { category: 'Design Trends', title: 'Why lifelike installations and sculptures are key to grand wedding scenes.' },
  { category: 'Real Weddings', title: 'A wedding to remember.' },
  { category: 'Press', title: "The Indian wedding planners who can pull off Taylor Swift's USD 20 Mn celebration." },
];

export default function Media() {
  return (
    <section className="page media-page">
      <div className="media-left">
        <h1 className="media-year">2026</h1>
        <p className="media-features">5 FEATURES</p>
      </div>
      <div className="media-right">
        {ARTICLES.map((a) => (
          <article className="article-card" key={a.title}>
            <div className="article-meta">
              <span className="article-category">{a.category}</span>
              <span className="article-year">2026</span>
            </div>
            <h3>{a.title}</h3>
            <a href="#" className="read-article" onClick={(e) => e.preventDefault()}>READ ARTICLE →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
