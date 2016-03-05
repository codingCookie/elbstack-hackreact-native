import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk, createLogger())
  )

  return createStore(rootReducer, initialState, enhancer)
}
