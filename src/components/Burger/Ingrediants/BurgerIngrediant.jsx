import React from 'react';
import './Ingrediant.css';

const Ingrediant = (props) => {
    let ingrediant = '';
    switch(props.type) {
        case ('salad'):
            ingrediant = <div className="salad my-3"></div>
            break;
        case ('cheez'):
            ingrediant = <div className="cheez my-3"></div>
            break;
        case ('meat'):
            ingrediant = <div className="meat my-3"></div>
            break;
        case ('frenchfrize'):
            ingrediant = <div className="frenchfrize my-3"></div>
            break;
    }
    return (
        ingrediant
    );
}
export default Ingrediant;