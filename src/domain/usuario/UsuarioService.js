import SecurityService from '../seguranca/SecurityService'
import {USER_LODADO_KEY} from './UsuarioConstants'
export default class UsuarioService{

    constructor(http){
        this._path = "usuario"
        this._http = http
    }

    cadastrar(usuario){
        if(usuario.username){
            return this._http.put(this._path,usuario).then(res => res.json());    
        }
        return this._http.post(this._path,usuario).then(res => res.json());
    }

    buscaUsuario(username){
        return this._http.get(`${this._path}/${username}`,
        SecurityService.getHeaderSecurity()
    ).then(usuario => usuario.json())
        .then(usuario => {
            console.log(usuario)
            this.setUsuario(usuario)
        });
    }
    static getUsuario(){
        return JSON.parse(localStorage.getItem(USER_LODADO_KEY))
    }

    static setUsuario(usuario){
        localStorage.setItem(USER_LODADO_KEY,JSON.stringify(usuario));
    }

    static removeUsuario(){
        localStorage.removeItem(USER_LODADO_KEY)
    }
}