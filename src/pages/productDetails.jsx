import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../component/ProductGrid.jsx";
import { useBag } from "../context/bagContext.js";
import {
  collections,
  getProduct,
  getProducts,
  formatPrice,
  imageUrl,
  DELIVERY_INFO,
  SIZE_GUIDE_IMAGES
} from "../data/site.js";

// The "key" makes React start fresh (reset size, colour, etc.) for each product
function ProductDetailsPage() {
  const { id } = useParams();
  return <ProductDetails key={id} handle={id} />;
}

function ProductDetails({ handle }) {
  const product = getProduct(handle);
  const { addItem } = useBag();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <main className="page container page-header">
        <h1>Product not found</h1>
        <Link to="/collections" className="btn">
          Back to collections
        </Link>
      </main>
    );
  }

  function handleAddToBag() {
    if (product.sizes.length > 0 && !size) {
      setError("Please select a size.");
      return;
    }
    setError("");
    addItem({
      handle: product.handle,
      title: product.title,
      price: product.price,
      image: product.images[0],
      color,
      size,
      qty
    });
  }

  // "You may also like": other pieces from the first collection that contains this product
  const parent = collections.find((c) => c.products.includes(handle));
  const related = parent
    ? getProducts(parent.products.filter((h) => h !== handle).slice(0, 4))
    : [];

  return (
    <main className="page">
      <div className="product container">
        {/* Gallery */}
        <div className="product__gallery">
          <div className="product__main-image">
            <img src={imageUrl(product.images[activeImage], 1100)} alt={product.title} />
          </div>
          {product.images.length > 1 && (
            <div className="product__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  className={i === activeImage ? "is-active" : ""}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={imageUrl(img, 200)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product__info">
          <p className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/collections">Collections</Link>
          </p>
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">
            {product.priceVaries && "From "}
            {formatPrice(product.price)}
          </p>

          {product.colors.length > 0 && (
            <fieldset className="option">
              <legend>
                Color: <span>{color}</span>
              </legend>
              <div className="option__values">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`pill ${c === color ? "is-selected" : ""}`}
                    aria-pressed={c === color}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {product.sizes.length > 0 && (
            <fieldset className="option">
              <legend>
                Size: <span>{size || "Select a size"}</span>
              </legend>
              <div className="option__values">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pill ${s === size ? "is-selected" : ""}`}
                    aria-pressed={s === size}
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="product__buy">
            <div className="qty qty--large">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
            <button type="button" className="btn btn--block" onClick={handleAddToBag}>
              Add to bag
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}

          {product.description && <p className="product__description">{product.description}</p>}

          <div className="accordion">
            {product.details.length > 0 && (
              <details open>
                <summary>Product details</summary>
                <ul className="product__details">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </details>
            )}
            <details>
              <summary>Delivery information</summary>
              <ul className="product__details">
                {DELIVERY_INFO.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Size guide</summary>
              <div className="size-guide">
                {SIZE_GUIDE_IMAGES.map((src) => (
                  <img key={src} src={imageUrl(src, 900)} alt="Size guide" loading="lazy" />
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && <ProductGrid title="You may also like" products={related} columns={4} />}
    </main>
  );
}

export default ProductDetailsPage;
