import {LOGOUT,USUARIO_LOGADO} from './SecurityConstants'
import SecurityService from './SecurityService'
import UsuarioService from '../usuario/UsuarioService'
import AutorService from '../autor/AutorService'
const INITIAL_STATE = {
    userToken : SecurityService.usuarioLogado(),
    logado : SecurityService.usuarioLogado() ? true : false 
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case LOGOUT:
            SecurityService.logout()
            return {userToken : '', logado : false}
        case USUARIO_LOGADO:
            return {userToken : SecurityService.usuarioLogado(), logado : true}
        default:
            return INITIAL_STATE
    }
}