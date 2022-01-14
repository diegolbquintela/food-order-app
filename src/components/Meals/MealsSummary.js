import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>food delivered to you</h2>
      <p>
        choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home
      </p>
      <p>
        all meals are cooked with high-quality ingredients, just-in-time and of
        course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
