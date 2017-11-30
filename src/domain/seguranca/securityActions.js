import {LOGOUT,USUARIO_LOGADO} from './SecurityConstants'
import { autorSetado } from '../autor/AutorActions';
export function usuarioLogado(){
    return { type: USUARIO_LOGADO}
}

export function logout(){
    return { type : LOGOUT }
} 