export default class ComentarioService{
    constructor(http){
        this._path = 'comentario'
        this._http = http
    }

    cadastrar(comentario){
        console.log(comentario)
        return this._http.post(`${this._path}/${comentario.dica.id}`,comentario)
        .then(res => res.json())
    }

    buscar(dicaId){
        return this._http.get(`${this._path}/${dicaId}`)
        .then(res => res.json())
    }
}