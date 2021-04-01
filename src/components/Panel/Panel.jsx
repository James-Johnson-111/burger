import React from 'react';
import './Panel.css';

const Panel = (props) => {
    const values = [
        {label : 'Cheez', type : 'cheez'},
        {label : 'Meat', type : 'meat'},
        {label : 'Salad', type : 'salad'}
    ]
    return (
        <div className="panel">
            {values.map((control, index) => (
                            <div className="justify-content-between d-flex my-3" key={index}>
                                <p>Add Some {control.label}</p>
                                <div>
                                    <button type="button" className="btn btn-sm px-4 rounded-0 mr-lg-1 mr-md-1" onClick={() => props.ingredientAdd(control.type)}>Add</button>
                                    <button type="button" className="btn btn-sm px-4 rounded-0 ml-lg-1 ml-md-1" onClick={() => props.ingredientLess(control.type)}
                                    disabled={props.disabled[control.type]}>Less</button>
                                </div>
                            </div>
            ))}
            <p>
                Total Price : <b>{props.price.toFixed(2)}</b>
            </p>
            <button 
                type="button" 
                className="btn btn-sm px-4 rounded-0" 
                disabled={props.disabled[values[0].type] && props.disabled[values[1].type] && props.disabled[values[2].type]}
                onClick={props.summery}
            >
                Order Now
            </button>
        </div>
    )
}
export default Panel;