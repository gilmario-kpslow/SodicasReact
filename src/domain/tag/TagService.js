import SecurityService from '../seguranca/SecurityService'
import {HOST} from '../constants'
import axios from 'axios'
export default class TagService{
    
    constructor(){
        this._path = `${HOST}/tag`
    }

    cadastrar(tag){
        return axios.post(this._path, tag ,SecurityService.getHeaderSecurity())
    }

    buscar(){
        return axios.get(this._path)
    }
}