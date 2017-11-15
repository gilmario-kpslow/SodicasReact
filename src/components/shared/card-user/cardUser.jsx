import React from 'react'
import If from '../controle/if'
import Rating from '../rating/rating'
export default props => (
    <If test={props.autor}>
        <div className="card text-center card-avatar">
            <div className="card-body">
                <img src={props.autor.avatar} width="128" height="128" />
            <h3 className="h3">{ props.autor.nome }</h3>
                <p className="h5">@{ props.autor.nickname }</p>
                <div className="row justify-content-md-center">
                    <Rating pontuacao={props.autor.pontuacao} />
            </div>
                <div className="card-text">
                    { props.autor.sobre }
                </div>
            </div>
        </div>
    </If>
)