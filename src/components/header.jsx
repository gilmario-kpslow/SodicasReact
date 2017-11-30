import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../domain/seguranca/securityActions'
import If from './shared/controle/if'
import ItemMenu from './shared/menu/itemMenu'
class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border border-top-0 border-left-0 border-right-0 border-secondary row">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <span className="icon has-text-primary">
                                <i className="fa fa-hashtag"></i>
                            </span>
                            SóDicas
                </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo">
                            <If test={this.props.security.logado}>
                                <ul className="navbar-nav mr-auto">
                                    <ItemMenu rendered={this.props.autor.autor} label="Dicas" icon="fa fa-book" to="/area" />
                                    <ItemMenu rendered={true} label="Perfil" icon="fa fa-user" to="/perfil" />
                                </ul>
                            </If>
                            <ul className="navbar-nav ml-auto">
                                <ItemMenu rendered={!this.props.security.logado} label="Login" icon="fa fa-user" to="/login" />
                                <ItemMenu rendered={this.props.security.logado && this.props.autor.autor} label="Conta de Acesso" icon="fa fa-user-secret" to="/acesso" />
                                <If test={this.props.security.logado}>
                                    <li className="nav-item">
                                        <div style={{ cursor: 'pointer' }} onClick={this.props.logout} className="nav-link">
                                            <i className="fa fa-power-off"></i> Sair
                                        </div>
                                    </li>
                                </If>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = state => ({ security: state.security, autor : state.autor })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Header)