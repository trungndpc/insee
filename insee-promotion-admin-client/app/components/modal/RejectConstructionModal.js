import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'

const REJECTED = 3;
class RejectConstructionModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen : this.props.isOpen
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(this.props.isOpen)
        }
        this._onClose = this._onClose.bind(this);
        this._onClickOK = this._onClickOK.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isOpen != nextProps.isOpen) {
            nextState.isOpen = nextProps.isOpen
            AppUtils.toggleModal(nextProps.isOpen)
            return true;
        }
        if (nextState != this.state) {
            return true;
        }
        return false;
    }

    _onClose() {
        AppUtils.toggleModal(false)
        this.props.onClose && this.props.onClose();
    }

    _onClickOK() {
        this.props.appActions.updateStatusConstruction(this.props.id, REJECTED)
        this._onClose();
    }

    render() {
        return (
            <div className={`popup-wraper3 ${this.state.isOpen && 'active'}`}>
                <div className="popup">
                    <span className="popup-closed"><i className="ti-close" /></span>
                    <div className="popup-meta">
                        <div className="popup-head">
                            <h5>Từ chối</h5>
                        </div>
                        <div className="Rpt-meta">
                            <span style={{ color: '#fa6342' }}>Bạn có chắc từ chối công trình này?</span>
                            <div method="post">
                                {/* <div>
                                    <label>Ghi chú</label>
                                    <textarea ref={e => this.noteRef = e} rows={2} defaultValue={""} />
                                </div> */}
                                <div className="btn-bar">
                                    <a onClick={this._onClickOK} className="add-butn" >Đồng ý</a>
                                    <a onClick={this._onClose} className="add-butn cancel">Đóng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RejectConstructionModal
