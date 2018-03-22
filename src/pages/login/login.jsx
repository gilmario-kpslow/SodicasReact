import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { usuarioLogado, logout } from '../../domain/seguranca/securityActions'
import { autorSetado } from '../../domain/autor/AutorActions'
import { show } from '../../components/shared/message/messageAction'
import SecurityService from '../../domain/seguranca/SecurityService'
import AutorService from '../../domain/autor/AutorService'
class Login extends Component {

    constructor(props){
        super(props)
        this.state = {credencias : {username : '', senha : ''}}
        this.login = this.login.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.service = new SecurityService()
        this.props.logout();
    }

    login(){
        this.service.login(this.state.credencias).then(resp => {
            this.props.autorSetado()
            this.props.usuarioLogado()
            if(AutorService.getAutor()){
                this.props.history.push('/area')
            }else{
                this.props.history.push('/perfil')
            }
        }).catch(err => {
            if(err.response.status == 401){
                this.props.show({msg: 'Usuário ou senha inválida', tipo : 'danger'})
            }else{
                console.log(err.message)
            }
        })
    }

    changeInput(e){
        const name = e.target.name
        const value = e.target.value
        this.setState({...this.state, credencias : {...this.state.credencias, [name] : value}})
    }

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
                                            <div className="input-group-prepend">
                                                <i className="input-group-text fa fa-user"></i>
                                            </div>
                                            <input name="username" onChange={this.changeInput} value={this.state.credencias.username} className="form-control" type="text" placeholder="username" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <i className="input-group-text fa fa-lock"></i>
                                            </div>
                                            <input name="senha" onChange={this.changeInput} value={this.state.credencias.senha} className="form-control" type="password" placeholder="senha" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button onClick={this.login} className="btn btn-primary">
                                            Entrar
                                        </button>
                                        <Link className="btn btn-link" to="/sigup">
                                            Cadastrar
                                        </Link>
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
Login = withRouter(Login)
const mapDispacthToProps = dispatch => bindActionCreators({usuarioLogado, logout, autorSetado, show},dispatch)
export default connect(null,mapDispacthToProps)(Login)