"use strict"
//IMPORT REACT
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

//REACT ROUTER
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers/index";
import {postBooks, updateBooks, deleteBooks} from "./actions/booksActions";
import {addToCart} from "./actions/cartActions";

const middleware = applyMiddleware(thunk, logger);


//CREATE STORE
const store = createStore(reducers, middleware);

//IMPORT COMPONENTS
import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";
import Main from "./main";

//RENDER THE COMPONENT
const Routes = (
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
    	<Route path="/admin" component={BooksForm} />
    	<Route path="/cart" component={Cart}/>
      </Route>
    </Router>
  </Provider> 		
)

render(
  Routes, document.getElementById("app")		
);

