import { useEffect, useState } from "react";
import { BagContext } from "./bagContext.js";

const STORAGE_KEY = "mz-bag";

// Read the saved bag (if any) when the site first loads
function loadBag() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function BagProvider({ children }) {
  const [items, setItems] = useState(loadBag);
  const [isOpen, setIsOpen] = useState(false);

  // Save the bag so it survives a page refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (e.g. private mode) — the bag still works for this visit
    }
  }, [items]);

  // item = { handle, title, price, image, color, size, qty }
  function addItem(item) {
    const key = `${item.handle}|${item.color}|${item.size}`;
    setItems((current) => {
      const existing = current.find((i) => i.key === key);
      if (existing) {
        return current.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
      }
      return [...current, { ...item, key }];
    });
    setIsOpen(true);
  }

  function updateQty(key, qty) {
    if (qty < 1) {
      removeItem(key);
      return;
    }
    setItems((current) => current.map((i) => (i.key === key ? { ...i, qty } : i)));
  }

  function removeItem(key) {
    setItems((current) => current.filter((i) => i.key !== key));
  }

  const count = items.reduce((total, i) => total + i.qty, 0);
  const subtotal = items.reduce((total, i) => total + i.price * i.qty, 0);

  const value = {
    items,
    count,
    subtotal,
    isOpen,
    openBag: () => setIsOpen(true),
    closeBag: () => setIsOpen(false),
    addItem,
    updateQty,
    removeItem
  };

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export default BagProvider;
