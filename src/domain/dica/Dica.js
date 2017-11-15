export default class Dica {

    constructor(jDica) {
        if (jDica) {
            this.id = jDica.id
            this.data = jDica.data
            this.titulo = jDica.titulo
            this.autor = jDica.autor
            this.conteudo = jDica.conteudo
            this.tags = jDica.tags
            this.pontuacao = jDica.pontuacao
            this.comentarios = jDica.comentarios;
        }else{
            this.titulo = ''
            this.conteudo =''
            this.tags = []
        }
    }




    get dataFormatada() {
        return new Date(this.data).toLocaleDateString();
    }
}