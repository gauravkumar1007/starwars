import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from './Reducers/index.js';

const Store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default Store;