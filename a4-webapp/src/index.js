import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
//import { createLogger } from 'redux-logger';
import reducer from './redux/reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Cart from "./Cart/Cart";

//const loggerMiddleware = createLogger();

function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            //loggerMiddleware
        )
    )
}

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/cart' component={Cart}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
