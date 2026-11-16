import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

// Contact form (front end only — messages are not sent anywhere yet)
function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="page container">
      <header className="page-header">
        <h1>Contact</h1>
        <p className="page-header__text">
          Our team is available to assist you via WhatsApp and email.
        </p>
      </header>

      <div className="contact">
        <aside className="contact__info">
          <h2>Get in touch</h2>
          <p>
            For orders, sizing questions and custom requests, message us directly or use the
            form.
          </p>
          {/* Social links are switched off for now: an <a> with no href does not navigate.
              To turn them back on, add href={SOCIAL.whatsapp} / href={SOCIAL.instagram}
              plus target="_blank" rel="noreferrer", and import SOCIAL from site.js. */}
          <a className="btn">
            <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
          </a>
          <a className="contact__social">
            <FaInstagram aria-hidden="true" /> @moellezavian
          </a>
        </aside>

        {sent ? (
          <div className="contact__form contact__thanks">
            <h2>Thank you</h2>
            <p>Your message has been received. We’ll be in touch soon.</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" required />
            </label>
            <label className="field">
              <span>E-mail</span>
              <input type="email" name="email" required />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea name="message" rows="6" required />
            </label>
            <button type="submit" className="btn">
              Send message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Contact;
