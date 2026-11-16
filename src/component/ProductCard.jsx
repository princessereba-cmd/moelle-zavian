import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../data/site.js";

// Product tile: main image, second image on hover, title and price
function ProductCard({ product }) {
  const [firstImage, secondImage] = product.images;

  return (
    <Link to={`/product/${product.handle}`} className="product-card">
      <div className="product-card__media">
        <img
          className="product-card__img"
          src={imageUrl(firstImage, 600)}
          alt={product.title}
          loading="lazy"
        />
        {secondImage && (
          <img
            className="product-card__img product-card__img--hover"
            src={imageUrl(secondImage, 600)}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">
          {product.priceVaries && "From "}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
