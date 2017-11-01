import React, { Component } from 'react'

export default class Dropdown extends Component {

    constructor(props){
        super(props)
        this.state = {toggle : false}
        this.clickToggle = this.clickToggle.bind(this)
    }
    
    getOpcoes(){
        const opcoes = this.props.opcoes || []
        return opcoes.map(op => (
            <div onClick={() => this.props.selecinandoItem(op)} key={op.id} className="dropdown-item clicar">
                {op.nome}
            </div>
        ))
    }

    clickToggle(){
        let toggle = this.state.toggle ? false: true;
        this.setState(...this.state,{ toggle : toggle})
    }

    render() {
        return (
            <div className="dropdown" onClick={this.clickToggle}>
                <button className={'btn btn-danger dropdown-toggle '+(this.state.toggle ? 'show' : '')} href="#" role="button" id="dropdown-menu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { this.props.label }
                </button>
                <div className={'dropdown-menu '+(this.state.toggle ? 'show' : '')} aria-labelledby="dropdown-menu3">
                    {this.getOpcoes()}
                </div>
            </div>
        )
    }
}