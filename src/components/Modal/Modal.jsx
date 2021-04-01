import React from 'react';
import './Modal.css';
import BackDark from './BackDark/BackDark';

const Modal = (props) => {
    return (
        <>
            <BackDark show={props.display} close={props.modalClose} />
            <div
                className="SummeryModal"
                style={{ 
                    'transform' : props.display ? 'translateY(0)' : 'translateY(-100vh)'
                 }}
                >
                {props.children}
            </div>
        </>
    );
}
export default Modal;