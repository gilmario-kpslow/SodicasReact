import {AUTOR_KEY} from './AutorConstants'
export default class AutorService{

    static getAutor(){
        return JSON.parse(localStorage.getItem(AUTOR_KEY))
    }

    static setAutor(autor){
        return localStorage.setItem(AUTOR_KEY,JSON.stringify(autor))
    }

    static removeAutor(){
        localStorage.removeItem(AUTOR_KEY)
    }
}