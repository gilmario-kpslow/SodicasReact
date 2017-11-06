import axios from 'axios'
import {HOST} from '../constants'
export default class ComentarioService{
    constructor(){
        this._path = `${HOST}/comentario`
    }

    cadastrar(comentario){
        return axios.post(`${this._path}/${comentario.dica.id}`,comentario)
    }

    buscar(dicaId){
        return axios.get(`${this._path}/${dicaId}`)
    }
}