import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../domain/seguranca/securityActions'
import If from '../components/shared/controle/if'
const Header = props => (
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
                    <If test={props.security.logado}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/area">
                                    <i className="fa fa-book"></i> Dicas
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/perfil">
                                    <i className="fa fa-user"></i>
                                    Perfil
                            </Link>
                            </li>
                        </ul>
                    </If>
                    <ul className="navbar-nav ml-auto">
                        <If test={!props.security.logado}>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fa fa-user"></i> Login
                                </Link>
                            </li>
                        </If>
                        <If test={props.security.logado}>
                            <li className="nav-item">
                                <Link className="nav-link" to="/acesso">
                                    <i className="fa fa-user-secret"></i> Conta de Acesso
                                </Link>
                            </li>
                        </If>
                        <If test={props.security.logado}>
                            <li className="nav-item">
                                <div style={{ cursor: 'pointer' }} onClick={props.logout} className="nav-link">
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
const mapStateToProps = state => ({ security: state.security })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Header)