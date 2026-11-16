import { useState } from "react";

// Newsletter sign-up (front end only — no email service connected yet)
function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter">
      <p className="eyebrow">Newsletter</p>
      <h2>Join the Moelle Woman Circle</h2>
      <p className="newsletter__text">
        Exclusive launches, early access, private offers, and elevated experiences from the
        world of Moelle Zavian.
      </p>

      {submitted ? (
        <p className="newsletter__thanks">Thank you — welcome to the circle.</p>
      ) : (
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            E-mail
          </label>
          <input id="newsletter-email" type="email" placeholder="E-mail" required />
          <button type="submit" className="btn btn--light">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}

export default Newsletter;
