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
        this.state = { opcoes: [], dicas: [], dados: { titulo : '', tags : []}, filtro : false, offset : 0 }
        this.getItemSelecionado = this.getItemSelecionado.bind(this)
        this.removeTag = this.removeTag.bind(this)
        this.mais = this.mais.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.filtrar = this.filtrar.bind(this)
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
        let offset = this.state.offset + 3;
        this.setState({...this.state,offset:offset})
        if(this.state.filtro){
            this.service.filtrar(this.state.dados,offset).then(resp => {
                let dicas = this.state.dicas
                resp.data.forEach(dica => dicas.push(dica))
                this.setState({...this.state, dicas : dicas})
            })
        }else{
            this.service.lancamento(offset).then(resp => {
                let dicas = this.state.dicas
                resp.data.forEach(dica => dicas.push(dica))
                this.setState({...this.state, dicas : dicas})
            })
        }
    }

    filtrar(){
        this.service.filtrar(this.state.dados,0)
        .then(resp => {
            this.setState({...this.state,filtro : true, dicas : resp.data}); 
        })
    }

    handleChange(e){
        this.setState({...this.state, dados : {...this.state.dados, titulo : e.target.value}})
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
                                            <input id="tituloBuscar" type='text' value={this.state.dados.titulo} onChange={this.handleChange} className="form-control" placeholder="Buscar uma dica" />
                                            <span className="input-group-btn">
                                                <button onClick={this.filtrar} className="btn btn-primary">
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
                            <button onClick={this.mais} className="btn btn-light">Mais Resultados</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}