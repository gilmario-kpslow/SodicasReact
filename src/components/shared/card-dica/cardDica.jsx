import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Rating from '../rating/rating'
import './cardDica.css'

export default class CardDica extends Component {
    constructor(props) {
        super(props)
        this.resumo = props.dica.conteudo.substring(0, 120).concat("...");
        this.dataformatada = new Date(props.dica.data).toLocaleDateString();
    }

    getTags(){
        let tags = this.props.dica.tags || []
        return tags.map(tag => (
            <span key={tag.id} className="tag btn btn-info btn-sm">{tag.nome}</span>
        ))
    }
    render() {
        return (
            <div className="card card-div">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h3 className="h3">{this.props.dica.titulo}</h3>
                            <p className="display-5">
                                {this.props.dica.autor.nickname}
                            </p>
                        </div>
                        <div className="col ml-auto">
                            {this.getTags()}
                        </div>
                    </div>
                    <p className="card-text">
                        {this.resumo}
                    </p>
                    <div className="row">
                        <div className="col mr-auto">
                            <Rating pontuacao={this.props.dica.pontuacao} />
                        </div>
                        <div className="col ml-auto">
                            <p className="text-right">{this.dataformatada}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mr-auto">
                            <Link to={`dica/${this.props.dica.id}`}>Ver Mais</Link>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}