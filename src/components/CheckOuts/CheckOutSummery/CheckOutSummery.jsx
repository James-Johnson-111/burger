import React from 'react';
import Burger from '../../Burger/Burger';

const CheckOutSummery = (props) => {
    return (
        <>
            <h1 className="my-3">We Hope It TastesWell!!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
                <div className="my-3">
                    <button className="btn btn-sm px-4 mr-1" onClick={props.cancelled}>Cancel</button>
                    <button className="btn btn-sm px-4 ml-1" onClick={props.continued}>Continue</button>
                </div>
            </div>
        </>
    );
}
export default CheckOutSummery;