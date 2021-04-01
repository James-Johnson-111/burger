import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as passwordHash from 'password-hash';

import './LoginForm.css';
import {Link} from 'react-router-dom';
import axios from '../../../axios-order';
import Spinner from '../../Spinner/Spinner';
import Modal from '../../Modal/Modal';

import * as actionsTypes from '../../../store/actions/actionsTypes';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User : {
                usremail : null,
                usrpass : null
            },
            loading : false,
            show : false,
        }
    }

    showHide = () => {
        if(this.state.show == false) {
            this.setState({show : true})
        }else {
            this.setState({show : false})
        }
    }

    inputChangeHandler = (event) => {
        const {name, value} = event.target;
        const consumer = {
            ...this.state.User,
            [name] : value
        };
        this.setState({User : consumer});
    }
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.get("https://burger-builder-c7517-default-rtdb.firebaseio.com/users.json")
             .then(response => {   
                 for(let d in response.data) {
                     this.setState({loading: true});
                     var varify = passwordHash.verify(this.state.User.usrpass, response.data[d].userpassword)
                     if((response.data[d].useremail == this.state.User.usremail) && varify == true) {
                        this.props.onUserDetails(response.data[d].username, response.data[d].useremail);
                        sessionStorage.setItem('usrname', response.data[d].username);
                        sessionStorage.setItem('usremail', response.data[d].useremail);
                        this.props.history.replace('/');
                        this.setState({loading: false});
                     }else {
                        this.props.errors("No records found, please try again or signup");
                        this.setState({show: true});
                        this.setState({loading: false});
                     }
                 }
             })
    }

    render() {
        let modal = null;
        if(this.props.error != null) {
            modal = <Modal 
                        display={this.state.show}
                        modalClose={this.showHide}
                    >
                        <h4 className="text-center">{this.props.error}</h4>
                    </Modal>
        }


        let former = (
            <form onSubmit={this.onSubmitHandler}>
                <h3 className="mb-3">Login</h3>
                <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Email" name="usremail" onChange={this.inputChangeHandler} />
                <input type="password" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Password" name="usrpass" onChange={this.inputChangeHandler} />
                <div className="text-center mb-3">
                    <button type="submit" className="btn btn-sm px-4 rounded-0">Login</button>
                </div>
                <small>
                    Don't Have An Account? 
                    <Link to="/signup" className="links">
                         Signup
                    </Link>
                </small>
            </form>
        );
            if(this.state.loading) {
                former = <Spinner />;
            }
        return (
            <>
                <div className="login-form w-100 vh-100 d-flex justify-content-center">
                    <div className="lform px-5 py-3">
                        {modal}
                        {former}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticate: state.auth,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
            onUserLogin: () => dispatch({type: actionsTypes.USER_LOGIN}),
            onUserLogout: () => dispatch({type: actionsTypes.USER_LOGOUT}),
            onUserDetails: (username, useremail) => dispatch({type: actionsTypes.USER_DETAILS, username: username, useremail: useremail}),
            errors: (error) => dispatch({type: actionsTypes.ERRORS, error: error})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);