import React,{Component} from 'react'
import './rating.css'
export default class RatingVotar extends Component{

    constructor(props){
        super(props)
        this.state = {stars : []}
        this.getClassName = this.getClassName.bind(this)
        this.marcar = this.marcar.bind(this)
        this.renderStar = this.renderStar.bind(this)
        this.votar = this.votar.bind(this)
    }

    componentWillMount(){
        this.setState({...this.state, stars : [
            {id : 1, marcado: false},
            {id : 2, marcado: false},
            {id : 3, marcado: false},
            {id : 4, marcado: false},
            {id : 5, marcado: false}
        ]})

    }
    getClassName(star){
        let cssName = '';
        if(star.marcado){
            cssName = cssName+'fa fa-star';
        }else{
            cssName = cssName+'fa fa-star-o';
        }
        if(this.props.pequena){cssName = cssName +' fa-lg';}
        if(this.props.grande){cssName = cssName +' fa-3x';}
        if(this.props.media){cssName = cssName +' fa-2x';}
        return cssName;
    }


    marcar(star){
        let stars = this.state.stars.map(st => {
            if(st.id == star.id){
                st.marcado = ! st.marcado
            }
            return st 
        })
        this.setState({...this.state, stars : stars})
        
    }

    votar(){
        let voto = 0
        this.state.stars.map(star => {
            if(star.marcado) voto = voto + 1
        })
        this.props.handleVotar(voto)
        this.componentWillMount();
    }

    renderStar(){
        let stars = this.state.stars || []
        return stars.map(star => {
            return (<span key={star.id} className="icon text-primary star">
                <i className={this.getClassName(star)} onClick={() => this.marcar(star)}></i>
            </span>)
        })
    }

    render(){
        return (
        <div className="row">
            {this.renderStar()}
            <button  onClick={this.votar} className="btn btn-dark btn-sm">Votar</button>
        </div>)
    }
}