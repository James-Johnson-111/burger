import React from 'react';

const OrderSummery = (props) => {
    const OrderSummery = Object.keys(props.ingredients).map((myKey, index) => {
        return <li className="mb-2" key={index}>
                <b className="text-uppercase">{myKey}</b> : {props.ingredients[myKey]}
               </li>
    })
    return (
        <div className="text-center">
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul className="text-left">
                {OrderSummery}
            </ul>
            <p>Total Price : <b>{props.price.toFixed(2)}</b></p>
            <button className="btn btn-sm px-4 rounded-0 mr-lg-1 my-lg-0 my-md-1 my-sm-2" onClick={props.modalClose}>Cancel</button>
            <button className="btn btn-sm px-4 rounded-0 ml-lg-1 my-lg-0 my-md-1 my-sm-2" onClick={props.Continue}>Checkout</button>
        </div>
    );
}
export default OrderSummery;