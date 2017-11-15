import SecurityService from '../seguranca/SecurityService'
import axios from 'axios'
import {HOST} from '../constants'
export default class DicaService {

    constructor() {
        this._path = `${HOST}/dica`
    }

    lancamento(offset) {
        let limit = 3
        return axios.get(`${this._path}/lancamento?limit=${limit}&offset=${offset}`)
    }

    filtrar(dados,offset) {
        let limit = 3
        return axios.post(`${this._path}/filtro/${limit}/${offset}`,dados)
    }

    carregar(id) {
        return axios.get(`${this._path}/${id}`)
    }

    buscarPor(autor){
        return axios.get(`${this._path}/autor/${autor.id}`)
    }
    cadastrar(dica){
        return axios.post(this._path,dica,SecurityService.getHeaderSecurity())
    }

    alterar(dica){
        return axios.put(this._path,dica,SecurityService.getHeaderSecurity())
    }

    remove(dica){
        return axios.delete(`${this._path}/${dica.id}`,SecurityService.getHeaderSecurity())
    }


    votar(voto){
        return axios.post(`${this._path}/votar`,voto)
    }


} 