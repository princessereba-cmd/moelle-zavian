import { Link } from "react-router-dom";
import ProductGrid from "../component/ProductGrid.jsx";
import VideoBanner from "../component/VideoBanner.jsx";
import CategoryTiles from "../component/CategoryTiles.jsx";
import ImageWithText from "../component/ImageWithText.jsx";
import Newsletter from "../component/Newsletter.jsx";
import {
  MEDIA,
  BRAND,
  HOME_COLLECTIONS,
  TESTIMONIALS,
  getProducts,
  imageUrl
} from "../data/site.js";

function Hero() {
  return (
    <section className="hero" aria-label="Featured collection">
      <video
        className="hero__media"
        src={MEDIA.heroVideo}
        poster={MEDIA.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <h1>Designed to Celebrate Becoming</h1>
        <Link to="/collections" className="btn btn--light">
          Shop Collection
        </Link>
      </div>
    </section>
  );
}

// Featured collection: title + product grid + "View all"
function FeaturedCollection({ collection, columns }) {
  return (
    <ProductGrid
      title={collection.title}
      products={getProducts(collection.products)}
      viewAllTo={`/collections/${collection.handle}`}
      columns={columns}
    />
  );
}

// Endless scrolling strip of customer testimonial images
function Testimonials() {
  // The list is repeated twice so the loop looks seamless
  const strip = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="testimonials" aria-label="Customer testimonials">
      <div className="testimonials__track">
        {strip.map((src, i) => (
          <img
            key={i}
            src={imageUrl(src, 600)}
            alt={i < TESTIMONIALS.length ? `Customer testimonial ${i + 1}` : ""}
            aria-hidden={i >= TESTIMONIALS.length}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const { lifeWellDressed, artOfBecoming, archiveInBloom } = HOME_COLLECTIONS;

  return (
    <main className="home">
      <Hero />

      <FeaturedCollection collection={lifeWellDressed} columns={3} />

      <ImageWithText image={MEDIA.aboutImage} title={BRAND.aboutTitle}>
        <p>{BRAND.about}</p>
        <Link to="/about" className="link-underline">
          Our story
        </Link>
      </ImageWithText>

      <VideoBanner
        src={MEDIA.artOfBecomingVideo}
        poster={MEDIA.artOfBecomingPoster}
        label="The Art of Becoming"
      />
      <FeaturedCollection collection={artOfBecoming} columns={4} />

      <VideoBanner
        src={MEDIA.archiveInBloomVideo}
        poster={MEDIA.archiveInBloomPoster}
        label="Archive in Bloom"
      />
      <FeaturedCollection collection={archiveInBloom} columns={4} />

      <CategoryTiles />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

export default Home;
