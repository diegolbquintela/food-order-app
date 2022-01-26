import { useState, useRef } from "react";

import classes from "./Checkout.module.css";

// validation helper functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    enteredName: true,
    enteredStreet: true,
    enteredCity: true,
    enteredPostalCode: true,
  });

  const enteredName = useRef("");
  const enteredStreet = useRef("");
  const enteredCity = useRef("");
  const enteredPostalCode = useRef("");

  const orderSubmittedHandler = (e) => {
    e.preventDefault();

    // store submitted data
    const userOrderData = {
      name: enteredName.current.value,
      street: enteredStreet.current.value,
      city: enteredCity.current.value,
      postalCode: enteredPostalCode.current.value,
    };

    // validation
    const enteredNameIsValid = !isEmpty(userOrderData.name);
    const enteredStreetIsValid = !isEmpty(userOrderData.street);
    const enteredCityIsValid = !isEmpty(userOrderData.city);
    const enteredPostalCodeIsValid =
      !isEmpty(userOrderData.postalCode) &&
      !isFiveChars(userOrderData.postalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    setFormInputIsValid({
      enteredName: enteredNameIsValid,
      enteredStreet: enteredStreetIsValid,
      enteredCity: enteredCityIsValid,
      enteredPostalCode: enteredPostalCodeIsValid,
    });

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={orderSubmittedHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={enteredName} />
        {!formInputIsValid.enteredName && (
          <p className={classes.invalid}>Invalid name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" ref={enteredStreet} />
        {!formInputIsValid.enteredStreet && (
          <p className={classes.invalid}>Invalid street address</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={enteredCity} />
        {!formInputIsValid.enteredCity && (
          <p className={classes.invalid}>Invalid City</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" ref={enteredPostalCode} />
        {!formInputIsValid.enteredPostalCode && (
          <p className={classes.invalid}>Invalid postal code</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="submit">Submit</button>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
