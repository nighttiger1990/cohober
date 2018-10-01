import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const args = (process.env.NODE_ENV === 'development') ? [thunk, logger] : [thunk];
export default function configureStore() {
    return createStore(rootReducer, {}, applyMiddleware(...args))
}