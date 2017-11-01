import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
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
                    <ul className="navbar-nav mr-auto" v-if="logado">
                        <li className="nav-item">
                            <a className="nav-link" href="#/area">
                                <i className="fa fa-book"></i>
                                Dicas<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="perfil">
                                <i className="fa fa-user"></i>
                                Perfil
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="fa fa-user"></i>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="acesso">
                                <i className="fa fa-user-secret"></i>
                                Conta de Acesso
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="home">
                                <i className="fa fa-power-off"></i>
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
</div>
)