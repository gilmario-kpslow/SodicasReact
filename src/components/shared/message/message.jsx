import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import If from '../controle/if'
import { show, hide, incremetaTempo } from './messageAction'
import './message.css'


const Message = props => (
    <If test={props.message.visible}>
        <div className="message">
            <div className={"alert alert-dismissible fade show " + props.message.classeCss} role="alert">
                <div className='text-message'>{props.message.mgs}</div>
                <div className={"progress-bar prog " + props.message.classeProgress} role="progressbar" style={{ width: props.message.tempo + '%' }} aria-valuenow={props.message.tempo} aria-valuemin="0" aria-valuemax="100"></div>
                <button type="button" onClick={props.hide} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </If>
)
const mapStateToProps = state => ({ message: state.message })
const mapDispatchToProps = dipatch => bindActionCreators({ show, hide, incremetaTempo }, dipatch)
export default connect(mapStateToProps, mapDispatchToProps)(Message)