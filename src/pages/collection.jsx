import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard.jsx";
import { collections, getCollection, products, imageUrl } from "../data/site.js";

// /collections          -> list of all collections
// /collections/:handle  -> products in one collection (also used for categories)
function Collections() {
  const { handle } = useParams();
  if (handle) return <CollectionProducts key={handle} handle={handle} />;
  return <AllCollections />;
}

function AllCollections() {
  return (
    <main className="page container">
      <header className="page-header">
        <h1>All collections</h1>
      </header>

      <div className="collection-list">
        {collections.map((c) => {
          const cover = products[c.products[0]];
          return (
            <Link key={c.handle} to={`/collections/${c.handle}`} className="collection-tile">
              <div className="collection-tile__media">
                {cover && <img src={imageUrl(cover.images[0], 700)} alt="" loading="lazy" />}
              </div>
              <h2>{c.title}</h2>
              <p>{c.products.length} pieces</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

const SORTS = {
  featured: { label: "Featured", fn: null },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price, high to low", fn: (a, b) => b.price - a.price },
  "title-asc": { label: "Alphabetically, A–Z", fn: (a, b) => a.title.localeCompare(b.title) }
};

function CollectionProducts({ handle }) {
  const [sort, setSort] = useState("featured");
  const collection = getCollection(handle);

  if (!collection) {
    return (
      <main className="page container page-header">
        <h1>Collection not found</h1>
        <Link to="/collections" className="btn">
          Back to collections
        </Link>
      </main>
    );
  }

  const sortFn = SORTS[sort].fn;
  const items = sortFn ? [...collection.items].sort(sortFn) : collection.items;

  return (
    <main className="page container">
      <header className="page-header">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/collections">Collections</Link>
        </p>
        <h1>{collection.title}</h1>
      </header>

      <div className="toolbar">
        <p>{items.length} products</p>
        <label className="toolbar__sort">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-grid product-grid--4">
        {items.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Collections;
