import { Link } from "react-router-dom";
import {
  FaShippingFast,
  FaGem,
  FaHeadset,
  FaLock,
  FaInstagram,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay
} from "react-icons/fa";
import { BRAND, FEATURES, collections } from "../../data/site.js";

const FEATURE_ICONS = {
  delivery: FaShippingFast,
  quality: FaGem,
  support: FaHeadset,
  secure: FaLock
};

const PAYMENT_ICONS = [
  [FaCcVisa, "Visa"],
  [FaCcMastercard, "Mastercard"],
  [FaCcAmex, "American Express"],
  [FaCcPaypal, "PayPal"],
  [FaApplePay, "Apple Pay"],
  [FaGooglePay, "Google Pay"]
];

function Footer() {
  return (
    <>
      {/* Feature strip */}
      <section className="features">
        {FEATURES.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon];
          return (
            <div key={feature.title} className="feature">
              <Icon className="feature__icon" aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          );
        })}
      </section>

      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__brand">
            <h2>{BRAND.manifestoTitle}</h2>
            <p>{BRAND.manifesto}</p>
          </div>

          <div>
            <h3>Collections</h3>
            <ul className="footer__links">
              {collections.map((c) => (
                <li key={c.handle}>
                  <Link to={`/collections/${c.handle}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Explore</h3>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>About</h3>
            <p>{BRAND.footerAbout}</p>
            {/* Social links are switched off for now: an <a> with no href does not navigate.
                To turn them back on, add href={SOCIAL.instagram} / href={SOCIAL.whatsapp}
                plus target="_blank" rel="noreferrer", and import SOCIAL from site.js. */}
            <div className="footer__social">
              <a aria-label="Instagram">
                <FaInstagram />
              </a>
              <a aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} - Moelle Zavian</p>
          <ul className="footer__payments" aria-label="Accepted payment methods">
            {PAYMENT_ICONS.map(([Icon, name]) => (
              <li key={name} title={name}>
                <Icon aria-label={name} />
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
