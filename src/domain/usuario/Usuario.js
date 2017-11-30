import Autor from '../autor/Autor'
export default class Usuario{
     constructor(username,email, autor = null){
        this.username = username
        this.email = email
        this.autor = autor;
    }
}