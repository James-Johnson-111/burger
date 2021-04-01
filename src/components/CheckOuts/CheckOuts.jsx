import {React, Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import CheckOutSummery from './CheckOutSummery/CheckOutSummery';
import './CheckOuts.css';
import OrderForm from '../OrderForm/OrderForm';

class CheckOuts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients : null,
            totalPrice : 0
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredient = {};
        
        let price = 0;

        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            }else {
                ingredient[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredient, totalPrice : price});
    }

    orderCancelledHandler = () => {
        this.props.history.goBack();
    }

    orderContinuedHandler = () => {
        // this.props.history.replace("/checkout/user-order");
        const queryParams = [];
        for(let x in this.state.ingredients) {
            queryParams.push(encodeURIComponent(x) + "=" + encodeURIComponent(this.state.ingredients[x]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.replace({
            pathname : '/orderform',
            search : '?' + queryString
        });
    }
    
    render() {
        return (
            <div className="text-center checkouts pt-5">
                <CheckOutSummery 
                    ingredients={this.state.ingredients} 
                    cancelled={this.orderCancelledHandler}
                    continued={this.orderContinuedHandler}
                />
                <Switch>
                    <Route path='/orderform' component={OrderForm} />
                </Switch>
            </div>
        );
    };
};
export default CheckOuts;