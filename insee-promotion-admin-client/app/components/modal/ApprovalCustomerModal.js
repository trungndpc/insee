import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'
class ApprovalCustomerModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen : this.props.isOpen
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(this.props.isOpen)
        }
        this._onClose = this._onClose.bind(this)
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

    render() {
        return (
            <div className={`popup-wraper3 ${this.state.isOpen && 'active'}`}>
                <div className="popup">
                    <span className="popup-closed"><i className="ti-close" /></span>
                    <div className="popup-meta">
                        <div className="popup-head">
                            <h5>Chấp nhận</h5>
                        </div>
                        <div className="Rpt-meta">
                            <span style={{ color: '#fa6342' }}>Bạn có chắc xác nhận nhà thầu này?</span>
                            <div method="post">
                                <div>
                                    <label>Ghi chú</label>
                                    <textarea rows={2} defaultValue={""} />
                                </div>
                                <div className="btn-bar">
                                    <a className="add-butn" >Đồng ý</a>
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

export default ApprovalCustomerModal
