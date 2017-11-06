import React from 'react'
import './cardComment.css'
export default props => (
    <div className="card card-div">
    <div className="card-body">
        <div className="card-title">
            <h5>{props.comment.autor }</h5>
        </div>
        <p className="card-text">{props.comment.conteudo }</p>
        <div>
            <small>{props.comment.dataFormatada}</small>
        </div>
    </div>
</div>
)