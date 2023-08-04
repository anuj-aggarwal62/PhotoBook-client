// index.js serves as the entry point for your React application
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';


// importing from App (same directory)
import App from './App';
import './index.css';

const store = createStore(reducers,compose(applyMiddleware(thunk)));
// Rendering using React engine on port 3000 (by default)
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
document.getElementById('root'));

