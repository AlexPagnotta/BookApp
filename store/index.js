import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { reducers, actions } from './module'

/**
 * Root states types.
 */
export { States } from './module'

// Apply thunk middleware
const middleware = applyMiddleware(thunk)

/**
 * Create app store.
 */
const createStore = (data: Object = {}) => {
  return _createStore(combineReducers(reducers), data, middleware)
}

export { createStore, actions }