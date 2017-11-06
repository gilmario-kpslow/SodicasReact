import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RatingVotar from '../../components/shared/rating/ratingVotar'
import CardComment from '../../components/shared/comment/cardComment'
import FormComment from '../../components/shared/comment/fromComment'
import DicaService from '../../domain/dica/DicaService'
import Dica from '../../domain/dica/Dica'
import ComentarioService from '../../domain/comentario/ComentarioService'
import Comentario from '../../domain/comentario/Comentario'
import AutorService from '../../domain/autor/AutorService'
import {show} from '../../components/shared/message/messageAction'
import './post.css'
class Post extends Component {
    constructor(props) {
        super(props)
        this.service = new DicaService();
        this.comentarioService = new ComentarioService()
        this.state = {dica : new Dica(), comentarios : []}
        this.addComentario = this.addComentario.bind(this)
        this.computarVoto = this.computarVoto.bind(this)
    }

    componentWillMount(){
        let id = this.props.match.params.id
        this.service.carregar(id).then(resp =>
            this.setState({...this.state, dica : new Dica(resp.data)})
        ).then( () =>
        this.comentarioService.buscar(this.state.dica.id)
            .then(resp =>{
                let ctms = resp.data.map(cmt => {
                    return new Comentario(cmt)
                });
                this.setState({...this.state, comentarios : ctms})
            }))
    }

    renderTag() {
        let tags = this.state.dica.tags || [];
        return tags.map(tag => (
            <span key={tag.id} className="tag btn btn-primary btn-sm">{tag.nome}</span>
        ))
    }

    renderAutor() {
        if (this.state.dica.autor) {
            return (<h2 className="h5">
                by {this.state.dica.autor.nickname}
                <small> {this.state.dica.dataFormatada}</small>
            </h2>)
        }else{
            return false
        }
    }

    renderComentario(){
        let comentarios = this.state.comentarios || []
        return comentarios.map(comm => {
            return (<CardComment key={comm.id} comment={comm}/>)})
    }

    computarVoto(voto){
        let autor = AutorService.getAutor();
        if(autor && (autor.id == this.state.dica.autor.id)){
            this.props.show({ msg : 'Não Permitido votar em suas próprias dicas!', tipo : 'danger' })
            return false
        }
        this.service.votar({dica : this.state.dica, nota : voto}).then(resp => {
            this.setState({...this.state, dica : resp.data})
            this.props.show({ msg : 'obrigado por participar', tipo : 'success' })
        }).catch(err => this.props.show({ msg : 'Erro em seu voto, tente novamente!', tipo : 'danger'}))        
    }

    addComentario(comentario){
        let cmt = new Comentario(comentario);
        cmt.dica = this.state.dica
        this.comentarioService.cadastrar(cmt).then(resp => {
            let comentarios = this.state.comentarios;
            comentarios.unshift(new Comentario(resp.data));
            this.setState({...this.state, comentarios : comentarios})
        })
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-warning">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-9">
                                <h1 className="display-5">{this.state.dica.titulo}</h1>
                                {this.renderAutor()}
                                <div className="tags">
                                    {this.renderTag()}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="text-center">
                                    <span className="tag btn btn-success btn-lg">{this.state.dica.pontuacao}</span>
                                </div>
                                <div><RatingVotar handleVotar={this.computarVoto} pequena={true}/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-justify">
                                {this.state.dica.conteudo}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            {this.renderComentario()}
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <FormComment addComentario={this.addComentario} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispacth => bindActionCreators({show},dispacth)
export default connect(null,mapDispatchToProps)(Post)