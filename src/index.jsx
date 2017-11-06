import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware,combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import App from './main/app'
import { BrowserRouter as Router } from 'react-router-dom'
import messageReducer from './components/shared/message/messageReducer'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
    message : messageReducer
})

const store = applyMiddleware(multi, promise, thunk)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('app'))