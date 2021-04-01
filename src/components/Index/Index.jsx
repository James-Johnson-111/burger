import React, {Component} from 'react';
import Burger from '../Burger/Burger';
import Panel from '../Panel/Panel';
import Modal from '../Modal/Modal';
import OrderSummery from '../Burger/OrderSummery/OrderSummery';
import './Index.css';
import axios from '../../axios-order';
import Spinner from '../Spinner/Spinner';

import * as actionsTypes from '../../store/actions/actionsTypes';
import { connect } from 'react-redux';

const INGREDIENT_PRICES = {
    cheez : 0.5,
    meat : 0.8,
    salad : 0.9
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients : null,
            totalPrice: 1,
            show: false,
            loading: false
        }
      }

    componentWillMount () {
        axios.get('https://burger-builder-c7517-default-rtdb.firebaseio.com/ingredients.json')
             .then(response => {
                this.setState({ingredients : response.data})
             });
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updateIngredients});
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updateIngredients});
    }

    showHide = () => {
        if(this.state.show == false) {
            this.setState({show : true})
        }else {
            this.setState({show : false})
        }
    }

    continueBuilding = () => {
        const queryParams = [];
        for(let x in this.state.ingredients) {
            queryParams.push(encodeURIComponent(x) + "=" + encodeURIComponent(this.state.ingredients[x]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });
    }

    render () {

        const disabledCH = {
            ...this.state.ingredients
        }

        for(let x in disabledCH) {
            disabledCH[x] = disabledCH[x] <= 0
        }

        let orderSummery = null;
        let content = (<div className="row pt-5"><Spinner /></div>);

        if(this.state.ingredients) {
            content = (
                <div className="row pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-12 offset-md-0 col-sm-12 text-center py-3">
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center px-5 py-3">
                    <Panel 
                                ingredientAdd={this.addIngredient}
                                ingredientLess={this.removeIngredient}
                                disabled={disabledCH}
                                price={this.state.totalPrice}
                                summery={this.showHide}
                             />
                </div>
            </div>
            );
            orderSummery = <OrderSummery
                                ingredients={this.state.ingredients} 
                                modalClose={this.showHide}
                                price={this.state.totalPrice}
                                Continue={this.continueBuilding}
                            />;
        }
        if(this.state.loading) {
            orderSummery = <Spinner />
        }


        return (
            <>
                <div className="index container-fluid">
                    <Modal 
                        display={this.state.show}
                        modalClose={this.showHide}
                    >
                        {orderSummery}
                    </Modal>
                    {content}
                </div>
            </>
    )
    }
}

// const mapStateToProps = state => {
//     return {
//         ings : state.ingredients
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//             onIngredientsAdded : (ingName) => dispatch({type : actionsTypes.ADD_INGREDIENT, ingredientName : ingName}),
//             onIngredientsRemoved : (ingName) => dispatch({type : actionsTypes.REMOVE_INGREDIENT, ingredientName : ingName}),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
export default Index;