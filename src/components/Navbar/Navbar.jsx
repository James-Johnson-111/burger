import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Navbar.css';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import {Link} from 'react-router-dom';
import * as actionsTypes from '../../store/actions/actionsTypes';

class Navbar extends Component {

    state = {
        show: false
    };

    componentDidMount() {
        if(sessionStorage.getItem('usrname')) {
            this.props.onUserDetails(sessionStorage.getItem('usrname'), sessionStorage.getItem('usremail'));
        }
    }

    sideBarSHow = () => {
        if(this.state.show == true) {
            this.setState({show: false});
        }else {
            this.setState({show: true});
        }
    }

    render() {
        let authBtn = <Link className="nav-link px-4" to="/login">Login</Link>;
        if(this.props.authenticate) {
            authBtn = <Link className="nav-link px-4" to="/" onClick={this.props.onUserLogout}>Logout</Link>;
        }
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <Link className="navbar-brand" to="#">Burger Builder</Link>
                    <button className="navbar-toggler" onClick={this.sideBarSHow}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                            <Link className="nav-link px-4" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link px-4" to="/checkout">CheckOut</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link px-4" to="/Orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                {authBtn}
                            </li>
                        </ul>
                    </div>
                </nav>
                <SideBar 
                    show={this.state.show}
                    display={this.state.show} 
                    modalClose={this.sideBarSHow}
                    auth={this.props.authenticate}
                    logout={this.props.onUserLogout}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticate: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
            onUserLogin : () => dispatch({type : actionsTypes.USER_LOGIN}),
            onUserLogout : () => dispatch({type : actionsTypes.USER_LOGOUT}),
            onUserDetails: (username, useremail) => dispatch({type: actionsTypes.USER_DETAILS, username: username, useremail: useremail})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);