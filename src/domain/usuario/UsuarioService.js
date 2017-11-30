import SecurityService from '../seguranca/SecurityService'
import { USER_LODADO_KEY } from './UsuarioConstants'
import axios from 'axios'
import { HOST } from '../constants'
export default class UsuarioService {

    constructor() {
        this._path = `${HOST}/usuario`
    }

    cadastrar(usuario) {
        if (usuario.username) {
            return axios.put(this._path, usuario)
        }
        return axios.post(this._path, usuario)
    }

    buscaUsuario(username) {
        return axios.get(`${this._path}/${username}`, {
            headers: SecurityService.getHeaderSecurity()
        }
        ).then(resp => {
            this.setUsuario(resp.date)
        });
    }
    static getUsuario() {
        return JSON.parse(localStorage.getItem(USER_LODADO_KEY))
    }

    static setUsuario(usuario) {
        localStorage.setItem(USER_LODADO_KEY, JSON.stringify(usuario));
    }

    static removeUsuario() {
        localStorage.removeItem(USER_LODADO_KEY)
    }
}