import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import * as passwordHash from 'password-hash';

import './SignupForm.css';
import {Link} from 'react-router-dom';
import axios from '../../../axios-order';
import Modal from '../../Modal/Modal';

import * as actionsTypes from '../../../store/actions/actionsTypes';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User : {
                usrname : null,
                usremail : null,
                usrpass : null,
                cnfpass : null
            },
            loading : false,
            show : false,
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

    showHide = () => {
        if(this.state.show == false) {
            this.setState({show : true})
        }else {
            this.setState({show : false})
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        if(
            (this.state.User.usrname != null) && 
            (this.state.User.usremail != null) &&
            (this.state.User.usrpass != null) &&
            (this.state.User.cnfpass != null)
            )
        {
            axios.get('users.json').then(response => {
                for(let d in response.data) {
                    if(response.data[d].useremail == this.state.User.usremail) {
                        this.setState({loading : true});
                        this.setState({show : true});
                    }else {
                        if(this.state.User.usrpass == this.state.User.cnfpass) {
                            this.setState({loading : true});
                            var hashedPassword = passwordHash.generate(this.state.User.usrpass);
                            const userData = {
                                username : this.state.User.usrname,
                                useremail : this.state.User.usremail,
                                userpassword : hashedPassword,
                            }
                            axios.post('/users.json', userData)
                                 .then(response => {
                                    this.setState({loading : false});
                                    this.props.onUserDetails(this.state.User.usrname, this.state.User.usremail, this.state.User.usrpass);
                                    sessionStorage.setItem('usrname', this.state.User.usrname);
                                    sessionStorage.setItem('usremail', this.state.User.usremail);
                                    this.props.history.replace('/');
                                 }).catch(error => {
                                    this.setState({loading : false});
                                })
                        }
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render() {
        
        let modal = null;
        if(this.state.show) {
            modal = <Modal 
                        display={this.state.show}
                        modalClose={this.showHide}
                    >
                        <h4 className="text-center">This email already has been taken</h4>
                    </Modal>
        }
        return (
            <>
                {modal}
                <div className="signup-form w-100 vh-100 d-flex justify-content-center">
                    <div className="sform px-5 py-3">
                        <form onSubmit={this.onSubmitHandler}>
                            <h3 className="mb-3">Signup</h3>
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Name" name="usrname" onChange={this.inputChangeHandler} required />
    
                            <input type="email" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Email" name="usremail" onChange={this.inputChangeHandler} required />
    
                            <input type="password" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Password" name="usrpass" onChange={this.inputChangeHandler} required />
    
                            <input type="password" className="form-control form-control-sm rounded-0 mb-3" placeholder="Confirm Password" name="cnfpass" onChange={this.inputChangeHandler} required />
    
                            <div className="text-center mb-3">
                                <button type="submit" className="btn btn-sm px-4 rounded-0">Signup</button>
                            </div>
                            <small>
                                Already Have An Account? 
                                <Link to="/login" className="links">
                                     Login
                                </Link>
                            </small>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticate: state.auth,
        userDetails: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
            onUserLogin: () => dispatch({type: actionsTypes.USER_LOGIN}),
            onUserLogout: () => dispatch({type: actionsTypes.USER_LOGOUT}),
            onUserDetails: (username, useremail, userpassword) => dispatch({type: actionsTypes.USER_DETAILS, username: username, useremail: useremail, userpassword: userpassword})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);