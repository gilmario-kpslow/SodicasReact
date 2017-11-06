import React, { Component } from 'react'
export default class FormComment extends Component {
    constructor(props){
        super(props)
        this.state = { comment : { autor : '', conteudo : ''}}
        this.handleAutor = this.handleAutor.bind(this)
        this.handleConteudo = this.handleConteudo.bind(this)
        this.comentar = this.comentar.bind(this)
    }

    componentWillMount(){
        this.setState({...this.state, comment : { autor : '', conteudo : ''} })
    }

    handleAutor(e){        
        this.setState({...this.state, comment : {...this.state.comment, autor : e.target.value}})
    }
    handleConteudo(e){
        this.setState({...this.state, comment : {...this.state.comment, conteudo : e.target.value}})
    }

    comentar(){
        this.props.addComentario(this.state.comment)
        this.componentWillMount()
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <input onChange={this.handleAutor} value={this.state.comment.autor} className="form-control" type="text" placeholder="Seu Nome" />
                    </div>
                    <div className="form-group">
                        <textarea onChange={this.handleConteudo} value={this.state.comment.conteudo} className="form-control" placeholder="Seu  comentário..."></textarea>
                    </div>
                    <div className="form-group">
                        <button onClick={this.comentar} className="btn btn-info">Comentar</button>
                </div>
            </div>
    </div >
        )
    }
}