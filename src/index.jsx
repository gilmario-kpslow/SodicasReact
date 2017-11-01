import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/app.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('app'))