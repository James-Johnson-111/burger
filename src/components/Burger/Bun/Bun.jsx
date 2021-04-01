import React from 'react';
import './Bun.css';

const Bun = (props) => {
    let bun = '';
    switch(props.type) {
        case ('upper_bun'):
            bun = <div className="upper_bun my-3"></div>
            break;
        case ('lower_bun'):
            bun = <div className="lower_bun my-3"></div>
            break;
        default:
            bun = '';
            break;
    }
    return(
        bun
    )
}
export default Bun;