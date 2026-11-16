import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useBag } from "../context/bagContext.js";
import { formatPrice, imageUrl } from "../data/site.js";

// Slide-in shopping bag panel
function BagDrawer() {
  const { items, count, subtotal, isOpen, closeBag, updateQty, removeItem } = useBag();

  // Lock page scroll and allow Escape to close while open
  useEffect(() => {
    document.body.classList.toggle("bag-open", isOpen);
    if (!isOpen) return;

    function onKey(event) {
      if (event.key === "Escape") closeBag();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBag]);

  return (
    <>
      <div className={`overlay ${isOpen ? "is-visible" : ""}`} onClick={closeBag} />

      <aside
        className={`bag-drawer ${isOpen ? "is-open" : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="bag-drawer__header">
          <h2>Bag ({count})</h2>
          <button type="button" className="icon-btn" aria-label="Close bag" onClick={closeBag}>
            <FaTimes />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bag-drawer__empty">
            <p>Your bag is empty.</p>
            <Link to="/collections" className="btn" onClick={closeBag}>
              Shop collections
            </Link>
          </div>
        ) : (
          <>
            <ul className="bag-drawer__items">
              {items.map((item) => (
                <li key={item.key} className="bag-item">
                  <Link to={`/product/${item.handle}`} onClick={closeBag}>
                    <img src={imageUrl(item.image, 200)} alt={item.title} />
                  </Link>

                  <div className="bag-item__info">
                    <Link to={`/product/${item.handle}`} onClick={closeBag} className="bag-item__title">
                      {item.title}
                    </Link>
                    <p className="bag-item__meta">
                      {[item.color, item.size].filter(Boolean).join(" · ")}
                    </p>
                    <p>{formatPrice(item.price)}</p>

                    <div className="bag-item__actions">
                      <div className="qty">
                        <button type="button" aria-label="Decrease quantity" onClick={() => updateQty(item.key, item.qty - 1)}>
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => updateQty(item.key, item.qty + 1)}>
                          +
                        </button>
                      </div>
                      <button type="button" className="bag-item__remove" onClick={() => removeItem(item.key)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bag-drawer__footer">
              <div className="bag-drawer__subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="bag-drawer__note">Shipping calculated at checkout.</p>
              <button type="button" className="btn btn--block" disabled title="Checkout is coming soon">
                Checkout — coming soon
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default BagDrawer;
