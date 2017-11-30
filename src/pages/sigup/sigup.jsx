import React from 'react'
import FormSigup from '../../components/sigup/formSigup'
export default props =>
    (
        <div>
            <div className="jumbotron jumbotron-fluid bg-info">
                <div className="container">
                    <h1 className="display-5 text-white">
                        Feliz aquele que transfere o sabe e aprende o que ensina.
                        </h1>
                    <h2 className="h4 text-white">
                        Cora Carolina.
                        </h2>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <FormSigup alterar={false} />
                    </div>
                </div>
            </div>
        </div>
    )