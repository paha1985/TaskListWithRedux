import { applyMiddleware, createStore, combineReducers } from 'redux';
//import { reducer } from './reducer';
import { thunk } from 'redux-thunk';
import { crudReducer, modalReducer } from './reducers';

const reducer = combineReducers({
	modalState: modalReducer,
	crudState: crudReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
