import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMeals = async () => {
    setIsLoading(true);

    const response = await fetch(
      "https://food-order-react-a8d11-default-rtdb.firebaseio.com/meals.json"
    );

    const mealsData = await response.json();

    const fetchedMeals = [];
    for (const key in mealsData) {
      fetchedMeals.push({
        id: key,
        name: mealsData[key].name,
        description: mealsData[key].description,
        price: mealsData[key].price,
      });
    }

    setMeals(fetchedMeals);

    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchMeals();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  // mapping fetched menu
  const mealsArray = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content;

  // dealing with errors
  isLoading && !error
    ? (content = <p>loading menu...</p>)
    : (content = <ul>{mealsArray}</ul>);

  if (error) {
    content = <p>something went wrong...</p>;
    throw new Error(error.message);
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
