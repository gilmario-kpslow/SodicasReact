import React from 'react'
import {connect} from 'react-redux'
import Login from '../../../pages/login/login'

const ComponentOrLogin = props => {
    if(props.security.logado){
        return props.children
    }else{
        return <Login />
    }
}

const mapStateToProps = state => ({security : state.security})
export default connect(mapStateToProps,null)(ComponentOrLogin) 