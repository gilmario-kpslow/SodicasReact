import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import React from 'react'
import { Route, Switch} from 'react-router-dom'
import Header from '../components/header'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
export default props => (
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    </div>
)