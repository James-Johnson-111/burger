import React from 'react';

const Order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name : ingredientName,
            amount : props.ingredients[ingredientName]
        })
    }

    const ingredientsNames = ingredients.map((ids, index) => {
        return <th key={index} className="text-center">{ids.name}</th>
    })

    const ingredientsAmount = ingredients.map((ids, index) => {
        return <th key={index} className="text-center">{ids.amount}</th>
    })
    
    return(
        <div className="p-4 shadow bg-white my-5">
            <table className="table">
                <thead>
                    <tr>
                        <th rowSpan="2" className="text-center">ingredients</th>
                        {ingredientsNames}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {ingredientsAmount}
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="text-center">
                            Total Price : ${Number.parseFloat(props.price).toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
export default Order;