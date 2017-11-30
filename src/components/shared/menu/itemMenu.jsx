import React from 'react'
import { Link } from 'react-router-dom'
import If from '../controle/if'

export default props => (
    <If test={props.rendered}>
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>
                <If test={props.icon}> <i className={props.icon}></i></If> {props.label}
            </Link>
        </li>
    </If>
)