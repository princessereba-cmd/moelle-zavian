import { Link } from "react-router-dom";
import { CATEGORY_TILES, imageUrl } from "../data/site.js";

// Dresses / Coords / Jump Suits image tiles with "Shop now"
function CategoryTiles() {
  return (
    <section className="category-tiles">
      {CATEGORY_TILES.map((tile) => (
        <Link key={tile.handle} to={`/collections/${tile.handle}`} className="category-tile">
          <img src={imageUrl(tile.image, 900)} alt="" loading="lazy" />
          <div className="category-tile__content">
            <h3>{tile.title}</h3>
            <span className="link-underline">Shop now</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default CategoryTiles;
