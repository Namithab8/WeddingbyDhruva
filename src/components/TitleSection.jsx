import React from 'react';

export default function TitleSection() {
  return (
    <section className="title-section">
      <div className="ts-inner">
        <span className="ts-lotus" aria-hidden="true">✿</span>
        <div className="ts-heading">
          <span className="ts-line" aria-hidden="true" />
          <h2>The Wedding Design Company</h2>
          <span className="ts-line ts-line-r" aria-hidden="true" />
        </div>
        <p className="ts-sub">Creating Timeless Celebrations, Crafted With Love.</p>
      </div>
    </section>
  );
}
