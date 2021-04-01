import React from 'react';
import './BackDark.css';

const BackDark = (props) => {
    return (
        props.show ? 
        <div className="backDark" onClick={props.close}></div>
         : null
    )
}

export default BackDark;