import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Usuario from '../../domain/usuario/Usuario'
import UsuarioService from '../../domain/usuario/UsuarioService'
import AutorService from '../../domain/autor/AutorService'
import { show } from '../../components/shared/message/messageAction'
class FormSigup extends Component {
    constructor(props) {
        super(props)
        let usuarioL = UsuarioService.getUsuario();
        if (usuarioL != null && usuarioL) {
            usuarioL.senha = ''
        }
        let usuario = this.props.alterar ? usuarioL : { username: '', email: '', senha: '', autor: {} };
        this.state = { usuario, confsenha: '', valido: true }
        this.changeInput = this.changeInput.bind(this)
        this.checarSenha = this.checarSenha.bind(this)
        this.salvar = this.salvar.bind(this)
        this.service = new UsuarioService()
    }

    changeInput(e) {
        const names = e.target.name.split(".");
        let value = e.target.value
        if (names.length > 1) {
            let nameObjeto = names[0]
            let name = names[1]
            this.setState({ ...this.state, [nameObjeto]: { ...this.state[nameObjeto], [name]: value } })
        } else {
            let name = names[0]
            this.setState({ ...this.state, [name]: value })
        }
    }

    checarSenha() {
        this.setState({ ...this.state, valido: this.state.usuario.senha == this.state.confsenha })
    }

    salvar() {
        if (this.state.valido) {
            let autor = AutorService.getAutor();
            let usuario = this.state.usuario
            usuario.autor = autor
            this.service.cadastrar(this.state.usuario).then(
                resp => {
                    this.props.show({ msg: 'Operação realizada com sucesso', tipo: 'success' });
                    this.props.history.push("/login")
                }).catch(
                err => {
                    console.log(err)
                    this.props.show({ msg: err.response.data.msg, tipo: "danger" })
                }
                );
        }
    }

    render() {
        return (
            <div className="card card-div">
                <div className="card-header bg-success text-white">
                    Cadastrar
            </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user"></i>
                            </span>
                            <input name="usuario.username" onChange={this.changeInput} value={this.state.usuario.username} disabled={this.props.alterar} className="form-control" type="text" placeholder="username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-envelope"></i>
                            </span>
                            <input name="usuario.email" onChange={this.changeInput} value={this.state.usuario.email} className="form-control" type="email" placeholder="Email" />
                            <span className="input-group-addon">
                                <i className="fa fa-check"></i>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock"></i>
                            </span>
                            <input name="usuario.senha" onChange={this.changeInput} value={this.state.usuario.senha} className="form-control" type="password" placeholder="senha" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock"></i>
                            </span>
                            <input onBlur={this.checarSenha} onChange={this.changeInput} name="confsenha"
                                value={this.state.confsenha} className={`form-control ${!this.state.valido ? 'is-invalid' : ''}`} type="password" placeholder="repetir senha" />
                            <span className="input-group-addon">
                                <i className={`fa ${this.state.valido ? 'fa-check is-valid' : 'fa-exclamation-triangle is-invalid'}`}></i>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.salvar}>
                            Salvar
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}
FormSigup = withRouter(FormSigup)
const mapDispatchToProps = dispatch => bindActionCreators({ show }, dispatch)
export default connect(null, mapDispatchToProps)(FormSigup)