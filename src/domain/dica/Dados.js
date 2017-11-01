export default class Dados{
    constructor(titulo,tags = []){
        this.titulo = titulo;
        this.tags = tags;
    }

    addTag(tag){
        this.tags.push(tag);
    }

    removeTag(tag){
        let i = this.tags.indexof(tag)
        this.tags.splice(i,1);
    }
}