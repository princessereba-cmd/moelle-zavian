import { Link } from "react-router-dom";
import ImageWithText from "../component/ImageWithText.jsx";
import VideoBanner from "../component/VideoBanner.jsx";
import { BRAND, MEDIA } from "../data/site.js";

// The reference site has no About page, so this is built from its brand copy.
function About() {
  return (
    <main className="page">
      <header className="page-header container">
        <h1>About</h1>
      </header>

      <ImageWithText image={MEDIA.aboutImage} title={BRAND.aboutTitle}>
        <p>{BRAND.about}</p>
      </ImageWithText>

      <section className="statement container">
        <h2>{BRAND.manifestoTitle}</h2>
        <p>{BRAND.manifesto}</p>
      </section>

      <VideoBanner
        src={MEDIA.artOfBecomingVideo}
        poster={MEDIA.artOfBecomingPoster}
        label="The Art of Becoming"
      />

      <section className="statement container">
        <p>{BRAND.footerAbout}</p>
        <Link to="/collections" className="btn">
          Shop collections
        </Link>
      </section>
    </main>
  );
}

export default About;
