import classes from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" />
      </div>
      <button type="button">Submit</button>
      <button onClick={props.onCancel} type="button">
        Cancel
      </button>
    </form>
  );
};

export default Checkout;
