import axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from './Order/Order';
import axioss from '../../axios-order';
import Spinner from '../Spinner/Spinner';
import * as actionsTypes from '../../store/actions/actionsTypes';

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            loading : true
        }
    }

    componentDidMount() {
        axioss.get('/orders.json')
             .then(response => {
                 const fetchingData = [];
                 for(let key in response.data) {
                     if(response.data[key].customerInfo.usremail == sessionStorage.getItem('usremail'))
                     fetchingData.push({
                         ...response.data[key],
                         orderId : key
                     })
                 }
                 this.setState({loading : false, orders : fetchingData});
             })
             .catch(error => {
                this.setState({loading : false});
            })
    }

    render() {
        if(!sessionStorage.getItem('usrname')) {
            this.props.errors("You must have to login first");
            this.props.history.replace('/login');
        }
        let orders = <Spinner />;
        if(!this.state.loading) {
            orders = (
                        this.state.orders
                             .map((order, index) => (
                                 <Order 
                                    key={index} 
                                    ingredients={order.ingredients}
                                    price={order.price}
                                    id={index}
                                 />
                                 ))
        )
        }
        return(
            <div className="container pt-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 offset-sm-0">
                        {orders}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
            errors: (error) => dispatch({type: actionsTypes.ERRORS, error: error})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);