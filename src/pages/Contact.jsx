import React, { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="page contact-page">
      <header className="page-head">
        <small>LET'S CONNECT</small>
        <h1>Contact Us</h1>
        <p>Tell us about your celebration — we would love to hear from you.</p>
      </header>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:hello@dhruva.com">hello@dhruva.com</a>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <a href="tel:+910000000000">+91 0000000000</a>
          </div>
          <div className="contact-item">
            <h3>Studio</h3>
            <p>123 Celebration Lane,<br />Mumbai, India</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <p className="form-success">Thank you — your enquiry has been received. We will be in touch soon.</p>
          ) : (
            <>
              <label>Name<input type="text" name="name" required placeholder="Your full name" /></label>
              <label>Email<input type="email" name="email" required placeholder="you@example.com" /></label>
              <label>Phone<input type="tel" name="phone" placeholder="+91 ..." /></label>
              <label>Message<textarea name="message" rows="5" required placeholder="Tell us about your celebration" /></label>
              <button type="submit" className="submit-btn">Send Enquiry</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
