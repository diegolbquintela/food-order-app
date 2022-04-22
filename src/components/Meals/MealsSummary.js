import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>food delivered to you</h2>
      <p>Choose your favorite meal from our broad selection</p>
      <p>
        All meals are cooked with high-quality ingredients provided by local
        farmers!
      </p>
    </section>
  );
};

export default MealsSummary;
