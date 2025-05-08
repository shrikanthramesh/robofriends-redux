import React from "react";
// import ReactDOM from 'react-dom'; The new way to import createRoot:
import { createRoot } from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//import thunkMiddleware from 'redux-thunk';
//NEW way of importing redux-thunk:
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import "tachyons";
import App from "./containers/App";
import { requestRobots, searchRobots } from "./reducers";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const logger = createLogger();

const rootReducers = combineReducers({ requestRobots, searchRobots });
const store = createStore(rootReducers, applyMiddleware(thunk, logger));

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// The old way to render the app:
// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );
