import React, { Component } from 'react'
import './rating.css'

export default class Rating extends Component {

    constructor(props) {
        super(props)
        this.pontuacao = props.pontuacao
        this.inteira = Math.trunc(this.pontuacao);
        this.fracao = Math.trunc((this.pontuacao - this.inteiro) * 100);
        this.starFull = this.starFull.bind(this);
        this.starHalf = this.starHalf.bind(this)
    }


    starFull() {
        let star = [];
        for (let i = 0; i < this.inteira; i++) {
            star.push(<i key={i} className="fa fa-star star"></i>)
        }
        return star.map(st => st);
    }

    starHalf() {
        if (this.fracao > 0) {
            return (<i className={"fa fa-star-half-o star"}></i>)
        }
    }

    render() {
        return (
            <div className="row">
                <span className={'btn btn-warning btn-sm star'}>
                    <b>{this.props.pontuacao}</b>
                </span>
                {this.starFull()}
                {this.starHalf()}
            </div>
        )
    }
}