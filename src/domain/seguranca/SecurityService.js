import { KEY_LOCALSTOREGE_USER, HEADER_AUTH } from './SecurityConstants'
import UsuarioService from '../usuario/UsuarioService'
import Usuario from '../usuario/Usuario'
import AutorService from '../autor/AutorService'
import {HOST} from '../constants'
import axios from 'axios'
export default class SecurityService {
    constructor() {
        this._path = `${HOST}/security`;
    }

    login(credencias) {
        return axios.post(`${this._path}/login`, credencias)
            .then(user => {
                localStorage.removeItem(KEY_LOCALSTOREGE_USER)
                localStorage.setItem(KEY_LOCALSTOREGE_USER, JSON.stringify({ username: user.username, token: user.token }))
                UsuarioService.setUsuario(new Usuario(user.usuario.username, user.usuario.email))
                AutorService.setAutor(user.usuario.autor)
                return user
            })
    }

    isLogado() {
        return localStorage.getItem(KEY_LOCALSTOREGE_USER) ? true : false;
    }

    usuarioLogado() {
        return JSON.parse(localStorage.getItem(KEY_LOCALSTOREGE_USER));
    }

    isValido() {
        let user = JSON.parse(localStorage.getItem(KEY_LOCALSTOREGE_USER))
        return axios.get(`${this._path}/logado`, {
            headers: {
                HEADER_AUTH: user.token
            }
        }).then(dado => true, err => false);
    }

    logout() {
        localStorage.removeItem(KEY_LOCALSTOREGE_USER)
        UsuarioService.removeUsuario()
        AutorService.removeAutor()
    }

    static getHeaderSecurity() {
        let user = JSON.parse(localStorage.getItem(KEY_LOCALSTOREGE_USER))
        return {
                headers : {
                    'Restrito': "true",
                    'Authentication': user.token
                }
            }
    }


}