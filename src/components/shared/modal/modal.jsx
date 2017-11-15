import React,{Component, ReactDOM} from 'react'
import './modal.css'
class Modal extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={`modal fade ${this.props.visible ? 'show bloco-block' : 'bloco-none'}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            {this.props.componentHeader()}
                        </div>
                        <button onClick={this.props.hide} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.componentBody()}
                    </div>
                    <div className="modal-footer">
                    {this.props.componentFooter()}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Modal