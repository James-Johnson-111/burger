import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './OrderForm.css';
import axios from '../../axios-order';
import Spinner from '../Spinner/Spinner';
// import './validations';
import * as actionsTypes from '../../store/actions/actionsTypes';

class OrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Customer : {
                usrname : null,
                usremail : null,
                usrhouse : null,
                usrstreet : null,
                usrsector : null,
                usrtown : null,
                delmode : null
            },
            loading : false,
            show : false,
            ingredients : null,
            totalPrice : 0
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredient = {};
        
        let price = 0;

        for(let param of query.entries()) {
            if(param[0] == 'price') {
                price = param[1];
            }else {
                ingredient[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredient, totalPrice : price});

        if(sessionStorage.getItem('usrname')) {
            this.setState({Customer: {
                usrname: sessionStorage.getItem('usrname'),
                usremail: sessionStorage.getItem('usremail')
            }})
        }
    }

    orderUserHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const customerData = {};
        for(let identifier in this.state.Customer) {
            customerData[identifier] = this.state.Customer[identifier];
        }
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customerInfo : customerData
        }
        console.log(order);
        axios.post('/orders.json', order)
             .then(response => {
                 this.setState({loading : false});
                 this.props.history.replace('/');
             }).catch(error => {
                 this.setState({loading : false});
             })
            console.log("Submitted");
    }

    inputChangeHandler = (event) => {
        const {name, value} = event.target;
        const consumer = {
            ...this.state.Customer,
            [name] : value
        };
        this.setState({Customer : consumer});
    }

    render() {
        console.log(this.props.authenticate);
        if(this.props.authenticate == false) {
            this.props.history.replace('/login');
        }
        let former = (
            <form onSubmit={this.orderUserHandler}>
                <h3 className="mb-3">Order Now</h3>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Name" name="usrname" onChange={this.inputChangeHandler} id="usrname" value={this.state.Customer.usrname} readOnly />
                        </div>
                        <div className="col-lg-12">
                            <input type="email" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Email" name="usremail" onChange={this.inputChangeHandler} id="usremail" value={this.state.Customer.usremail} readOnly />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your House Number" name="usrhouse" onChange={this.inputChangeHandler} id="usrhouse" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Street Number" name="usrstreet" onChange={this.inputChangeHandler} id="usrstreet" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Sector" name="usrsector" onChange={this.inputChangeHandler} id="usrsector" />
                        </div>
                        <div className="col-lg-6">
                            <input type="text" className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Twon" name="usrtown" onChange={this.inputChangeHandler} id="usrtown" />
                        </div>
                        <div className="col-lg-12">
                            <select className="form-control form-control-sm rounded-0 mb-3" placeholder="Your Name" name="delmode" onChange={this.inputChangeHandler} id="delmode">
                                <option value=""></option>
                                <option value="normal">normal</option>
                                <option value="fast">fast</option>
                                <option value="fastest">fastest</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-3">
                    <button className="btn btn-sm px-4 rounded-0">Order</button>
                </div>
            </form>
        );
            if(this.state.loading) {
                former = <Spinner />;
            }
        return (
            <>
                <div className="order-form w-100 vh-100 d-flex justify-content-center">
                    <div className="oform px-5 py-3">
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
    }
}

export default connect(mapStateToProps, null)(OrderForm);