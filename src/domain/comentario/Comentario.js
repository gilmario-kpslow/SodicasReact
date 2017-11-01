export default class Comentario{
    constructor(jComentario){
        this.id = jComentario.id
        this.autor = jComentario.autor
        this.conteudo = jComentario.conteudo
        this.data = jComentario.data,
        this.dica = jComentario.dica
    }

    get dataFormatada() {
        return new Date(this.data).toLocaleDateString();
    }
}