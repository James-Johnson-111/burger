import React from 'react';
import './Spinner.css';
import spin from '../../images/35.gif';

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={spin} width="20" height="20" />
        </div>
    );
}
export default Spinner;