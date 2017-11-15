import {LOGOUT,USUARIO_LOGADO} from './SecurityConstants'
export function usuarioLogado(){
    return { type: USUARIO_LOGADO}
}

export function logout(){
    return { type : LOGOUT }
} 