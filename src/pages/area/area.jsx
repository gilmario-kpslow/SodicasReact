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
            dica: { titulo: "", conteudo: "", tags: [] }, autor: {}, tag: {}, erros: [], tagsOption: [], dicas: [],
            titulo: { haErro: false, valide: ['required'], errors: [] },
            conteudo: { haErro: false, valide: ['required'], errors: [] },
            tags: { haErro: false, valide: ['required'], errors: [] },
            modalTag: false,
            modalConformacao: false
        }
        this.service = new DicaService()
        this.tagService = new TagService()
        this.changeInput = this.changeInput.bind(this)
        this.addError = this.addError.bind(this)
        this.validarCampo = this.validarCampo.bind(this)
        this.validar = this.validar.bind(this)
        this.getErros = this.getErros.bind(this)
        this.validadeAll = this.validadeAll.bind(this)
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
        console.log(value)
        if (name == "tags") {
            let tags = this.state.dica[name] || [];
            tags.push(value)
            value = tags
        }
        this.setState({ ...this.state, [nameObjeto]: { ...this.state[nameObjeto], [name]: value } })
    }

    addError(campo, mensagem) {
        const gera_id = () => {
            var size = 8
            var randomized = Math.ceil(Math.random() * Math.pow(10, size));//Cria um número aleatório do tamanho definido em size.
            var digito = Math.ceil(Math.log(randomized));//Cria o dígito verificador inicial
            while (digito > 10) {//Pega o digito inicial e vai refinando até ele ficar menor que dez
                digito = Math.ceil(Math.log(digito));
            }
            var id = randomized + '-' + digito;//Cria a ID
            return id
        }
        const valide = this.state[campo].valide || [];
        let errors = this.state[campo].errors || [];
        let possui = false;
        errors.forEach(err => {
            if (err.msg == mensagem) {
                possui = true
            }
        })
        if (!possui) {
            errors.push({ id: gera_id(), msg: mensagem })
        }
        this.setState({ ...this.state, [campo]: {...this.state[campo], haErro : true, errors} });
    }

    validarCampo(e) {
        let names = e.target.name
        let name = names.split('.')[1]
        let value = e.target.value
        this.validar(name, value, this.state[name].valide)

    }

    validar(name, value, validate) {
        validate.forEach(val => {
            switch (val) {
                case 'required':
                    console.log(value.length == 0)
                    if (value.length == 0) {
                        this.addError(name, "Campo Obrigatório")
                    } else {
                        this.setState({ ...this.state, [name]: { ...this.state[name], haErro: false, errors: [] } })
                    }
                    break
                default:
                    console.log("aqui " + name + " " + value)
                    this.setState({ ...this.state, [name]: { ...this.state[name], haErro: false, errors: [] } })
            }
        })

    }

    getErros(campo) {
        const erros = this.state[campo].errors || []
        return erros.map(m => (
            <div key={m.id} className="invalid-feedback">{m.msg}</div>
        ))

    }

    validadeAll() {
        let campos = ['titulo', 'conteudo', 'tags']
        let erro = false;
        campos.forEach(val => {
            let valor = this.state.dica[val];
            this.validar(val, valor, this.state[val].valide)
        })
        return !(this.state.titulo.errors.length > 0 || this.state.conteudo.errors.length > 0 || this.state.tags.errors.length > 0)
    }

    addDica() {
        let hasErro = this.validadeAll();
        if (hasErro) {
            if (this.state.dica.id) {
                this.service.alterar(this.state.dica).then(resp => this.props.show({ msg: resp.data.msg, tipo: 'success' }))
                    .catch(
                    err => {
                        if (err.status == 401) {
                            this.props.logout();
                        }
                    }
                    );
            } else {
                let dica = this.state.dica;
                dica.autor = this.state.autor;
                this.service.cadastrar(dica).then(
                    resp => {
                        let dicas = this.state.dicas || []
                        dicas.push(resp.data)
                        this.setState({ ...this.state, dicas })
                    })
                    .catch(
                    err => {
                        if (err.status == 401) {
                            this.props.logout();
                        }
                    }
                    );
            }
            this.limparForm();
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
                if (err.status == 401) {
                    this.props.logout();
                }
            }
            );
    }

    limparForm() {
        this.setState({ ...this.state, dica: new Dica() })
    }
    seleciona(dica) {
        this.setState({ ...this.state, dica })
    }
    remove() {
        this.dicaService.remove(this.state.dica).then(
            resp => {
                let dicas = this.state.dicas || []
                let i = dicas.indexOf(this.state.dica);
                dicas.splice(i, 1);
                this.setState({ ...this.state, dicas })
                this.props.show({ msg: resp.data.msg, tipo: 'success' })
                this.hideModal('modalConformacao');
            }).catch(
            err => {
                if (err.status == 401) {
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
                        <button onClick={() => {
                            this.seleciona(dica)
                            this.showModal('modalConformacao')
                        }
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
            <option key={tag.id} value={JSON.stringify(tag)}>{tag.nome}</option>
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
                                                <input name="dica.titulo" onChange={this.changeInput} onBlur={this.validarCampo} value={this.state.dica.titulo}
                                                    className={`form-control ${this.state.titulo.haErro ? 'is-invalid' : ''}`} type="text"
                                                    placeholder="Informe o titulo pra sua dica" />
                                                <If test={this.state.titulo.haErro}>
                                                    {this.getErros('titulo')}
                                                </If>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Conteúdo</label>
                                                <textarea onChange={this.changeInput} name="dica.conteudo" onBlur={this.validarCampo} className={`form-control ${this.state.conteudo.haErro ? 'is-invalid' : ''}`}
                                                    value={this.state.dica.conteudo} placeholder="Informe sua dica"></textarea>
                                                <If test={this.state.conteudo.haErro}>
                                                    {this.getErros('conteudo')}
                                                </If>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label"> Tags
                                                    <button onClick={() => this.showModal('modalTag')} title="Nova Tag" className="btn btn-sm">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </label>
                                                <select onChange={this.changeInput} onBlur={this.validarCampo} name="dica.tags" className={`form-control ${this.state.tags.haErro ? 'is-invalid' : ''}`} value={this.state.dica.tags} multiple={true} size="5">
                                                    {this.renderTags()}
                                                </select>
                                                <If test={this.state.tags.haErro}>
                                                    {this.getErros('tags')}
                                                </If>
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