import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaRegUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";
import { collections, categories, products, MEDIA, imageUrl, formatPrice } from "../../data/site.js";
import { useBag } from "../../context/bagContext.js";

// Main menu. Items with "children" get a dropdown.
const MENU = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections", children: collections },
  { to: "/categories", label: "Categories", children: categories },
  { to: "/contact", label: "Contact" }
];

const ALL_PRODUCTS = Object.values(products);

function Navbar() {
  const { pathname } = useLocation();
  const { count, openBag } = useBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);

  // Header is transparent over the homepage video until you scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile menu
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const isTransparent = pathname === "/" && !scrolled && !menuOpen && !searchOpen;

  function closeAll() {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }

  const results =
    query.trim().length > 1
      ? ALL_PRODUCTS.filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
      : [];

  return (
    <>
      <header className={`navbar ${isTransparent ? "navbar--transparent" : ""}`}>
        {/* Left: menu button (mobile) + links (desktop) */}
        <div className="navbar__left">
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className="nav-links" aria-label="Main">
            {MENU.map((item) => (
              <div key={item.to} className="nav-item">
                <NavLink to={item.to} end={item.to === "/"} className="nav-link" onClick={closeAll}>
                  {item.label}
                  {item.children && <FaChevronDown className="nav-caret" aria-hidden="true" />}
                </NavLink>

                {item.children && (
                  <ul className="dropdown">
                    {item.children.map((child) => (
                      <li key={child.handle}>
                        <Link to={`/collections/${child.handle}`} onClick={closeAll}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Centre: logo */}
        <Link to="/" className="logo" onClick={closeAll}>
          <img src={isTransparent ? MEDIA.logoWhite : MEDIA.logoBlack} alt="Moelle Zavian" />
        </Link>

        {/* Right: currency + icons */}
        <div className="navbar__right">
          <span className="currency hide-mobile">NGN ₦</span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(!searchOpen);
            }}
          >
            <FaSearch />
          </button>
          <button type="button" className="icon-btn hide-mobile" aria-label="Account (coming soon)" title="Account — coming soon">
            <FaRegUser />
          </button>
          <button type="button" className="icon-btn" aria-label={`Shopping bag, ${count} items`} onClick={openBag}>
            <FaShoppingBag />
            {count > 0 && <span className="bag-count">{count}</span>}
          </button>
        </div>
      </header>

      {/* Search panel */}
      {searchOpen && (
        <div className="search-panel">
          <div className="container">
            <input
              type="search"
              placeholder="Search for products"
              aria-label="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {results.length > 0 && (
              <ul className="search-results">
                {results.map((p) => (
                  <li key={p.handle}>
                    <Link to={`/product/${p.handle}`} onClick={closeAll}>
                      <img src={imageUrl(p.images[0], 120)} alt="" />
                      <span>{p.title}</span>
                      <span className="search-results__price">{formatPrice(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.trim().length > 1 && results.length === 0 && (
              <p className="search-empty">No products found for “{query}”.</p>
            )}
          </div>
        </div>
      )}

      {/* Mobile navigation drawer */}
      <nav className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-label="Mobile" aria-hidden={!menuOpen}>
        {MENU.map((item) =>
          item.children ? (
            <details key={item.to} className="mobile-menu__group">
              <summary>
                {item.label} <FaChevronDown aria-hidden="true" />
              </summary>
              <Link to={item.to} onClick={closeAll}>
                View all {item.label.toLowerCase()}
              </Link>
              {item.children.map((child) => (
                <Link key={child.handle} to={`/collections/${child.handle}`} onClick={closeAll}>
                  {child.title}
                </Link>
              ))}
            </details>
          ) : (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className="mobile-menu__link" onClick={closeAll}>
              {item.label}
            </NavLink>
          )
        )}
        <NavLink to="/about" className="mobile-menu__link" onClick={closeAll}>
          About
        </NavLink>

        <div className="mobile-menu__footer">
          <span className="currency">NGN ₦</span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
