import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-secondary">
                    <div className="container">
                        <h3 className="display-5 text-white">
                            Sábio é aquele que partilha seus conhecimentos.
                </h3>
                        <h3 className="h4 text-white">
                            <small>Édy Leonardo.</small>
                        </h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 mr-auto ml-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    Login
                        </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </div>
                                            <input className="form-control" type="text" placeholder="username" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-lock"></i>
                                            </div>
                                            <input className="form-control" type="password" placeholder="senha" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">
                                            Entrar
                                </button>
                                        <a className="btn btn-link" href="sigup">
                                            Cadastrar
                                </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
