import { useState, useEffect } from "react";
import axios from "axios";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeals = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://food-order-react-a8d11-default-rtdb.firebaseio.com/meals.json"
    );

    console.log(response);
    const mealsData = await response.json();
    console.log(mealsData);

    const mealsDataArray = Object.keys(mealsData).map((key) => {
      console.log(mealsData[key]);
      return mealsData[key];
    });

    setMeals(mealsDataArray);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const mealsArray = meals.map((meal) => (
    <MealItem
      //id={meal.id} // need fix later
      id={Math.random() * 100}
      //key={meal.id}
      key={Math.random() * 100}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsArray}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
