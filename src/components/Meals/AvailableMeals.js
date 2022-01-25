import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    fetchMeals();
  }, []);

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

  content = isLoading ? <p>loading menu...</p> : <ul>{mealsArray}</ul>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
