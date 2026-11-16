import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

// A titled grid of product cards with an optional "View all" button.
// columns = how many cards per row on desktop (3 or 4)
function ProductGrid({ title, products, viewAllTo, columns = 4 }) {
  return (
    <section className="section container">
      {title && <h2 className="section-heading">{title}</h2>}

      <div className={`product-grid product-grid--${columns}`}>
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>

      {viewAllTo && (
        <div className="section-footer">
          <Link to={viewAllTo} className="btn btn--outline">
            View all
          </Link>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
