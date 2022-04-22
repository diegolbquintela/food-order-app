import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';

import mealsImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Mahlzeit</h1>
        <HeaderCartButton onClick={props.onCartShow} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="table served with food" />
      </div>
    </Fragment>
  );
};

export default Header;
