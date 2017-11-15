import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Header from '../components/header'
import Message from '../components/shared/message/message'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import ComponentOrLogin from '../components/shared/seguranca/componentOrLogin'
import Area from '../pages/area/area'
import Post from '../pages/post/post'
export default props =>
    (
        <div>
            <Message />
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dica/:id" component={Post} />
                <Route path="/login" component={Login} />
                <Route path="/area">
                    <ComponentOrLogin>
                        <Area />
                    </ComponentOrLogin>
                </Route>
                <Route path="/acesso" component={Login} />
                <Route path="*" component={Home} />
            </Switch>
        </div>
    )