import React, { Component } from 'react'
import Dropdown from '../../components/shared/dropdown/dropdown'
import DicaService from '../../domain/dica/DicaService'
import TagService from '../../domain/tag/TagService'
import CardDica from '../../components/shared/card-dica/cardDica'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.service = new DicaService()
        this.tagService = new TagService()
        this.state = { opcoes: [], dicas: [], dados: {} }
        this.getItemSelecionado = this.getItemSelecionado.bind(this)
        this.removeTag = this.removeTag.bind(this)
    }

    componentWillMount() {
        this.tagService.buscar().then(resp => this.setState({ ...this.state, opcoes: resp.data }))
        this.service.lancamento(0).then(resp => this.setState({ ...this.state, dicas: resp.data }))
    }

    getItemSelecionado(opcao) {
        let dadosTag = this.state.dados.tags || []
        if (!dadosTag.map(tag => tag.id).includes(opcao.id)) {
            dadosTag.push(opcao)
            let dados = { ...this.state.dados, tags: dadosTag }
            this.setState({ ...this.state, dados: dados })
        }
    }

    getDicas() {
        let dicas = this.state.dicas || []
        return dicas.map(dica => (
            <div key={dica.id} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 card-div">
                <CardDica dica={dica} />
            </div>
        ))
    }

    removeTag(tag) {
        let dadosTag = this.state.dados.tags || []
        let i = dadosTag.indexOf(tag)
        dadosTag.splice(i, 1)
        let dados = { ...this.state.dados, tags: dadosTag }
        this.setState({ ...this.state, dados: dados })
    }

    getTagDados() {
        let dadosTag = this.state.dados.tags || []
        return dadosTag.map(tag => (
            <span key={tag.id} className="tag btn btn-light btn-sm">
                {tag.nome}
                <button style={{ marginTop: -3 + 'px', marginLeft: 3 + 'px' }} className="close" onClick={(tag) => this.removeTag(tag)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </span>
        ))
    }
    mais() {

    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col mr-auto">
                                <h3 className="display-5 text-white">
                                    Compartilhando Conhecimento
                            </h3>
                                <h3 className="h2 text-white">
                                    <small>conquistando o mundo.</small>
                                </h3>
                            </div>
                            <div className="col ml-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group">
                                            <input className="form-control" type="text" placeholder="Buscar uma dica" />
                                            <span className="input-group-btn">
                                                <button className="btn btn-primary">
                                                    <i className="fa fa-search"></i>
                                                    Buscar
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: 5 + 'px' }}>
                                    <div className="col mr-auto float-left">
                                        <div className="control">
                                            {this.getTagDados()}
                                        </div>
                                    </div>
                                    <div className="col-auto ml-auto float-right">
                                        <Dropdown label="Selecione tags" selecinandoItem={this.getItemSelecionado} opcoes={this.state.opcoes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {this.getDicas()}
                    </div>
                    <div className="row">
                        <div className="col-3 mx-auto">
                            <button onClick={this.mais()} className="btn btn-light">Mais Resultados</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}