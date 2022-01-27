import { useState, useContext } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [order, setOrder] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // handler functions
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item });
  };
  const orderButtonHandler = (e) => {
    setOrder(true);
  };
  const cancelOrderHandler = (e) => {
    setOrder(false);
  };

  // mapping cart items
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind to ensure that the helper function receives the id
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // post request to database
  const confirmOrderHandler = (userOrderData) => {
    setIsLoading(true);

    fetch(
      "https://food-order-react-a8d11-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userOrderData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    // clear input fields
    setIsLoading(false);
    setOrder(false);
    setOrderFeedback(true);
    cartCtx.cleanCart();
    return (
      <Modal>
        <p>Order sent with success! Your items will arrive shortly.</p>
      </Modal>
    );
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <Checkout
          onConfirm={confirmOrderHandler}
          onCancel={cancelOrderHandler}
        />
      )}
      {orderFeedback && (
        <p>Order sent with success! Your items will arrive shortly.</p>
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          close
        </button>
        {hasItems && (
          <button onClick={orderButtonHandler} className={classes.button}>
            order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
