import { useReducer } from "react";
import axios from "axios";

import CartContext from "./cart-context";

// default state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// actions
const cartReducer = (state, action) => {
  if (action.type === "GET_MEALS") {
    return {
      ...state,
      transactions: action.payload,
    };
  }

  if (action.type === "MEALS_ERROR") {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex]; //if item doesn't exist, returns null, otherwise, this item will be set by the item
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem, //copy the existing
        amount: existingCartItem.amount + action.item.amount, //update the amount
      };
      updatedItems = [...state.items]; //copying old array
      updatedItems[existingCartItemIndex] = updatedItem; //overwriting item of the existing array
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

// provider component
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // actions
  const getMeals = async () => {
    try {
      const res = await axios.get(
        "https://food-order-react-a8d11-default-rtdb.firebaseio.com/"
      );

      dispatchCartAction({
        type: "GET_MEALS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatchCartAction({
        type: "MEALS_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const addItemToCartHandler = async (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
