import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CardUser from '../../components/shared/card-user/cardUser'
import AutorService from '../../domain/autor/AutorService'
import Autor from '../../domain/autor/Autor'
import UsuarioService from '../../domain/usuario/UsuarioService'
import {show} from '../../components/shared/message/messageAction'
import {autorSetado} from '../../domain/autor/AutorActions'
import './perfil.css'
class Perfil extends Component{
    
    constructor(props){
        super(props)
        let autor = AutorService.getAutor()
        let usuario = UsuarioService.getUsuario()
        autor = (autor != null && autor) ? autor : new Autor('https://marketplace.canva.com/MAB6v9eTAHs/1/thumbnail/canva-robot-avatar-MAB6v9eTAHs.png','',usuario.username,0,'')
        this.service = new UsuarioService()
        this.state = {autor, isShow : false, opcoes : [
            'https://marketplace.canva.com/MAB6v9eTAHs/1/thumbnail/canva-robot-avatar-MAB6v9eTAHs.png',
            'https://upload.wikimedia.org/wikipedia/commons/d/d9/Avatar_robot_head.png',
            'http://www.clker.com/cliparts/H/e/F/a/2/K/blue-robot-md.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Robot-clip-art-book-covers-feJCV3-clipart.png/202px-Robot-clip-art-book-covers-feJCV3-clipart.png',
            'https://marketplace.canva.com/MAB6v7RGMOw/1/thumbnail/canva-robot-electric-avatar-icon-MAB6v7RGMOw.png',
            'https://marketplace.canva.com/MAB6vzmEQlA/1/thumbnail/canva-robot-electric-avatar-icon-MAB6vzmEQlA.png'
        ], usuario}
        this.toggle = this.toggle.bind(this)
        this.mudar = this.mudar.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.salvar = this.salvar.bind(this)
        this.renderOpcao = this.renderOpcao.bind(this)
    }

    toggle(){
        this.setState({...this.state, isShow : !this.state.isShow})
    }

    mudar(opcao){
        this.setState({...this.state, isShow : false, autor : {...this.state.autor, avatar : opcao}})
    }

    changeInput(e){
        const names = e.target.name.split(".");
        let nameObjeto = names[0]
        let name = names[1]
        let value = e.target.value
        this.setState({ ...this.state, [nameObjeto]: { ...this.state[nameObjeto], [name]: value } })
    }

    salvar() {
        let usuario = this.state.usuario
        usuario.autor = this.state.autor
        this.service.cadastrar(usuario).then(resp =>
         {
             let user = resp.data
             UsuarioService.removeUsuario()
             AutorService.removeAutor()
             UsuarioService.setUsuario(user)
             AutorService.setAutor(user.autor)
             this.props.autorSetado()
             this.props.history.push('/area')
        }).catch(err => this.props.show({ msg: err.message, tipo: 'danger' }))
    }

    renderOpcao(){
        let opcoes = this.state.opcoes || []
        return opcoes.map( opcao => (
            <div key={opcao} className="col-sx-12 col-sm-12 col-md-6 col-lg-2">
            <img src={opcao} className="img-fluid clicavel" onClick={() => this.mudar(opcao)} />
        </div>
        ))
    }
    
    render(){
        return (
            <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 bg-success area-user">
                <CardUser autor={this.state.autor} />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mx-auto">
                <div className="card text-center card-div">
                    <div className="card-header text-left">
                        <span className="h4">Seu Perfil</span>
                    </div>
                    <div className="card-body">
                        <img src={this.state.autor.avatar} onClick={this.toggle} width="128" height="128" />
                        <div className={`collapse ${this.state.isShow ? 'show' : ''}`} id="collapseExample">
                            <div className="card card-body block-img">
                                <div className="row">
                                   { this.renderOpcao() }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input name="autor.nome" value={this.state.autor.nome} onChange={this.changeInput} className="form-control" type="text" placeholder="Nome" />
                        </div>
                        <div className="form-group">
                            <input disabled name="autor.nickname" value={this.state.autor.nickname} className="form-control" type="text" placeholder="Apelido" />
                        </div>
                        <div className="form-group">
                            <textarea name="autor.sobre" value={this.state.autor.sobre} onChange={this.changeInput} className="form-control" type="text" placeholder="Sobre"></textarea>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-primary" onClick={this.salvar}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
Perfil = withRouter(Perfil)
const mapDispatchToProps = dispatch => bindActionCreators({show, autorSetado}, dispatch)
export default connect(null,mapDispatchToProps)(Perfil)