import React, { Component } from 'react'
import CardUser from '../../components/shared/card-user/cardUser'
import FormSigup from '../../components/sigup/formSigup'
import AutorService from '../../domain/autor/AutorService'

export default class Acesso extends Component {
    constructor(props){
        super(props)
        this.state = {autor : AutorService.getAutor() }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 bg-success area-user">
                    <CardUser autor={this.state.autor} />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mx-auto">
                    <FormSigup alterar={true} />
                </div>
            </div>
        )
    }
}