import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/Navbar';
import Index from './components/Index/Index';
import Checkout from './components/CheckOuts/CheckOuts';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import OrderForm from './components/OrderForm/OrderForm';
import SignupForm from './components/Auth/SignupForm/SignupForm';
import Orders from './components/Orders/Orders';
import Error404 from './components/404/Error404';

import {Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
    <>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/Orders" component={Orders} />
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/orderform" component={OrderForm} />
                    <Route exact path="/signup" component={SignupForm} />
                    <Route exact component={Error404} />
                </Switch>
      </>
  );
}

export default App;
