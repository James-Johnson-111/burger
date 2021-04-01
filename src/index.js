import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './fonts.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';


const store = createStore(reducer);

ReactDOM.render(
                <React.StrictMode>
                  <Provider store={store}>
                    <Router>
                      <App />
                    </Router>
                  </Provider>
                </React.StrictMode>,
                  document.getElementById('root')
);
reportWebVitals();