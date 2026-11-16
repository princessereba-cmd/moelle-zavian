import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import BagProvider from "./context/BagProvider.jsx";
import Navbar from "./component/Navbar.jsx/navbar.jsx";
import Footer from "./component/footer.jsx/footer.jsx";
import BagDrawer from "./component/BagDrawer.jsx";

import Home from "./pages/home.jsx";
import Collections from "./pages/collection.jsx";
import Categories from "./pages/categories.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contacts.jsx";
import ProductDetails from "./pages/productDetails.jsx";

// Jump to the top of the page whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <BagProvider>
        <ScrollToTop />
        <Navbar />
        <BagDrawer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:handle" element={<Collections />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>

        <Footer />
      </BagProvider>
    </BrowserRouter>
  );
}

export default App;
