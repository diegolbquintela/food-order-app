import React from "react";

// create context
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  cleanCart: () => {},
});

export default CartContext;
