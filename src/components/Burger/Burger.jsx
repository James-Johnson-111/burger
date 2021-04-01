import React from 'react';
import Bun from './Bun/Bun';
import BurgerIngrediant from './Ingrediants/BurgerIngrediant';
import './Burger.css';

const Burger = (props) => {
    const a = "Usman Badar";
    const MyBurger = Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngrediant key={igkey + i} type={igkey} />;
        });
    });
    return(
        <div className="burger">
            <Bun type="upper_bun" />
                {MyBurger}
            <Bun type="lower_bun" />
        </div>
    );
}
export default Burger;