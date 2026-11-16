import { createContext, useContext } from "react";

// Shared shopping-bag state. The provider lives in BagProvider.jsx.
export const BagContext = createContext(null);

// Use inside any component:  const { items, addItem } = useBag();
export function useBag() {
  return useContext(BagContext);
}
