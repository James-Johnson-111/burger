import React, { Component } from 'react';
import './SideBar.css';
import BackDark from '../Modal/BackDark/BackDark';
import {Link} from 'react-router-dom';

class SideBar extends Component {
    
    render() {
        
        let authBtn = <Link className="nav-link px-4" to="/login" onClick={this.props.modalClose}>Login</Link>;
        if(this.props.auth) {
            authBtn = <Link className="nav-link px-4" to="/" onClick={this.props.logout}>Logout</Link>;
        }

        return (
            <>
                <BackDark show={this.props.display} close={this.props.modalClose} />
                <div className='sidebar text-center'
                    style={{ 'transform' : this.props.show ? 'translateX(0)' : 'translateX(-100%)' }}
                >
                    <h3 className="mb-3">Buger Builder</h3>
                    <Link className="d-block mb-3 px-4" to="/" onClick={this.props.modalClose}>Home <span className="sr-only">(current)</span></Link>
                    <Link className="d-block mb-3 px-4" to="/orders" onClick={this.props.modalClose}>Orders</Link>
                    {authBtn}
                </div>
            </>
        );
    }
}

export default SideBar;