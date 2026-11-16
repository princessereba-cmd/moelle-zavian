import CategoryTiles from "../component/CategoryTiles.jsx";

function Categories() {
  return (
    <main className="page">
      <header className="page-header container">
        <h1>Categories</h1>
        <p className="page-header__text">Shop by silhouette.</p>
      </header>
      <CategoryTiles />
    </main>
  );
}

export default Categories;
