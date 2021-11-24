import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from "./App";
import Home from "./Home";
import ProductDetail from "./ProductDetail";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={App} exact/>
                <Route path='/product/:id' component={ProductDetail} exact/>
                <Route path='/' component={Home} exact/>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
