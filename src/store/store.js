import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from 'redux'

// const { createStore, compose, combineReducers } = Redux

import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { appReducer } from './reducers/app.reducer.js'
import { reviewReducer } from './reducers/review.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    appModule: appReducer,
    reviewModule: reviewReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
