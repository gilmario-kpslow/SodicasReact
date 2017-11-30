import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../domain/seguranca/securityActions'
import { show } from '../../components/shared/message/messageAction'
import CardUser from '../../components/shared/card-user/cardUser'
import If from '../../components/shared/controle/if'
import CardDica from '../../components/shared/card-dica/cardDica'
import Modal from '../../components/shared/modal/modal'
import DicaService from '../../domain/dica/DicaService'
import Dica from '../../domain/dica/Dica'
import TagService from '../../domain/tag/TagService'
import AutorService from '../../domain/autor/AutorService'
import './area.css'


class Area extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dica: new Dica(), autor: {}, tag: {}, erros: [], tagsOption: [], dicas: [],
            modalTag: false,
            modalConformacao: false
        }
        this.service = new DicaService()
        this.tagService = new TagService()
        this.changeInput = this.changeInput.bind(this)
        this.changeSelect = this.changeSelect.bind(this)
        this.addDica = this.addDica.bind(this)
        this.addTag = this.addTag.bind(this)
        this.limparForm = this.limparForm.bind(this)
        this.seleciona = this.seleciona.bind(this)
        this.remove = this.remove.bind(this)
        this.renderDicas = this.renderDicas.bind(this)
        this.renderModais = this.renderModais.bind(this)
        this.renderTags = this.renderTags.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.tituloInput = null;
    }

    componentWillMount() {
        let autor = AutorService.getAutor();
        this.service.buscarPor(autor).then(resp => {
            let dicas = resp.data;
            this.setState({ ...this.state, autor, dicas })
        });
        this.tagService.buscar().then(resp => this.setState({ ...this.state, tagsOption: resp.data }));

    }


    changeInput(e) {
        const names = e.target.name.split(".");
        let nameObjeto = names[0]
        let name = names[1]
        let value = e.target.value
        this.setState({ ...this.state, [nameObjeto]: { ...this.state[nameObjeto], [name]: value } })
    }

    changeSelect(e) {
        const names = e.target.name.split(".");
        let nameObjeto = names[0]
        let name = names[1]
        let value = +e.target.value
        console.log(value)
        let tags = this.state.dica[name] || [];
        let index = tags.indexOf(value); 
        if(index === -1){
            tags.push(value);
        }else if(index > -1){
            tags.splice(index,1)
        }
        this.setState({ ...this.state, [nameObjeto]: { ...this.state[nameObjeto], [name]: tags } })
    }

    addDica() {
        const tagsOption = this.state.tagsOption || [] 
        const tagsId = this.state.dica.tags || [];
        const tags = tagsOption.filter((ele) => tagsId.indexOf(ele.id) > -1)
        let dica = this.state.dica
        dica.tags = tags
        if (dica.id) {
            this.service.alterar(dica).then(
                resp => {
                    let dicas = this.state.dicas.filter((val) => val.id != dica.id) || []
                    dicas.push(dica);
                    this.setState({...this.state, dicas, dica: new Dica()})
                    this.props.show({ msg: resp.data.msg, tipo: 'success' })
                })
                .catch(
                err => {
                    if (err.response.status == 401) {
                        this.props.logout();
                    }
                }
                );
        } else {
            dica.autor = this.state.autor;
            this.service.cadastrar(dica).then(
                resp => {
                    let dicas = this.state.dicas || []
                    dicas.push(new Dica(resp.data))
                    this.setState({ ...this.state, dicas, dica: new Dica() })
                })
                .catch(
                err => {
                    if (err.response.status == 401) {
                        this.props.logout();
                    }
                }
                );
        }
    }
    addTag() {
        this.tagService.cadastrar(this.tag).then(
            resp => {
                let tagsOption = this.state.tagsOption || []
                tagsOption.push(resp.data)
                this.setState({ ...this.state, tag: {}, tagsOption })
                this.hideModal('modalTag')
            }).catch(
            err => {
                if (err.response.status == 401) {
                    this.props.logout();
                }
            }
            );
    }

    limparForm() {
        this.setState({ ...this.state, dica: new Dica() })
    }
    seleciona(dica) {
        this.tituloInput.focus()
        let dicaSelect = {...dica};
        const tags = dica.tags.map(tag => tag.id)
        dicaSelect.tags = tags
        this.setState({ ...this.state, dica : dicaSelect})
    }
    remove() {
        this.service.remove(this.state.dica).then(
            resp => {
                let dicas = this.state.dicas.filter(val => val.id != this.state.dica.id) || []
                this.setState({ ...this.state, dicas })
                this.props.show({ msg: resp.data.msg, tipo: 'success' })
                this.hideModal('modalConformacao');
            }).catch(
            err => {
                if (err.response.status == 401) {
                    this.props.logout();
                } else {
                    this.props.show({ msg: err.data.msg, tipo: 'danger' })
                }
            }
            );
        this.limparForm();
    }

    hideModal(nameModal) {
        this.setState({ ...this.state, [nameModal]: false })
    }

    showModal(nameModal) {
        this.setState({ ...this.state, [nameModal]: true })
    }


    renderDicas() {
        const dicas = this.state.dicas || []
        return dicas.map(dica => (
            <div key={dica.id} className="card-div">
                <div className="content">
                    <CardDica dica={dica}>
                        <button onClick={() => this.seleciona(dica)} title="alterar" className="btn btn-sm">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button onClick={() => this.setState({...this.state, dica, modalConformacao : true})
                        } title="Remover" className="btn btn-sm btn-danger">
                            <i className="fa fa-trash"></i>
                        </button>
                    </CardDica>
                </div >
            </div >
        ))
    }

    renderTags() {
        const tags = this.state.tagsOption || []
        return tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.nome}</option>
        ))
    }
    renderModais() {
        const header1 = () => (<p>Cadastrar Tag</p>)
        const body1 = () => (
            <div>
                <div className="form-group">
                    <label className="control-label">Nome</label>
                    <input onChange={this.changeInput} value={this.state.tag.nome} className="form-control" type="text" placeholder="Informe o nome da tag" />
                </div>
            </div>
        )
        const footer1 = () => (
            <div className="footer">
                <div className="form-group">
                    <button onClick={this.addTag} className="btn btn-primary">Salvar</button>
                    <button onClick={() => this.hideModal('modalTag')} className="btn btn-danger">Cancelar</button>
                </div>
            </div>
        )
        const header2 = () => (<p>Confirmação</p>)

        const body2 = () => (
            <div>
                <p>Este procedimento removerá esta dica de nossa base de dados, deseja realizar esta operação?</p>
            </div>
        )

        const footer2 = () => (
            <div className="footer">
                <div className="form-group">
                    <button onClick={this.remove} className="btn btn-info">OK</button>
                    <button onClick={() => this.hideModal('modalConformacao')} className="btn btn-danger">Cancelar</button>
                </div>
            </div>
        )

        return (
            <div>
                <Modal visible={this.state.modalTag} hide={() => this.hideModal('modalTag')} componentHeader={header1} componentBody={body1} componentFooter={footer1} />
                <Modal visible={this.state.modalConformacao} hide={() => this.hideModal('modalConformacao')} componentHeader={header2} componentBody={body2} componentFooter={footer2} />
            </div>
        )

    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 bg-success">
                            <CardUser autor={this.state.autor} />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card card-div">
                                        <header className="card-header"> Criar Dicas </header>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="control-label">Titulo</label>
                                                <input ref={(input) => { this.tituloInput = input; }} name="dica.titulo" onChange={this.changeInput} value={this.state.dica.titulo}
                                                    className='form-control' type="text"
                                                    placeholder="Informe o titulo pra sua dica" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Conteúdo</label>
                                                <textarea onChange={this.changeInput} name="dica.conteudo" className='form-control'
                                                    value={this.state.dica.conteudo} placeholder="Informe sua dica"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label"> Tags
                                                    <button onClick={() => this.showModal('modalTag')} title="Nova Tag" className="btn btn-sm">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </label>
                                                <select onChange={this.changeSelect} name="dica.tags" className='form-control' value={this.state.dica.tags} multiple={true} size="5">
                                                    {this.renderTags()}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button onClick={this.addDica} className="btn btn-primary">Salvar</button>
                                                <button onClick={this.limparForm} className="btn btn-link">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    {this.renderDicas()}
                                </div >
                            </div >
                        </div>
                        {this.renderModais()}
                    </div >
                </div >
            </div>
        )
    }
}

const mapDispachToPros = dispatch => bindActionCreators({ logout, show }, dispatch)
export default connect(null, mapDispachToPros)(Area)