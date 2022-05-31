import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'
import AlertUtils from '../../utils/AlertUtils'
import SubmitConstructionModel from '../../model/SubmitConstructionModel';

const APPROVED = 3;
class ApprovedSubmitConstructionModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            submitId: null,
        }
        this._onClose = this._onClose.bind(this)
        this._onClickOK = this._onClickOK.bind(this)
        this.open = this.open.bind(this)
        this.isDisableClick = false;
    }

    open(id) {
        AppUtils.toggleModal(true)
        this.setState({ isOpen: true, submitId: id })
    }

    _onClose() {
        AppUtils.toggleModal(false)
        this.isDisableClick = false;
        this.setState({ isOpen: false, submitId: null })
        this.props.callback && this.props.callback()
    }

    _onClickOK() {
        if (!this.isDisableClick && this.state.submitId) {
            this.isDisableClick = true;
            SubmitConstructionModel.updateStatus(this.state.submitId, APPROVED)
                .then(resp => {
                    this._onClose();
                    AlertUtils.showSuccess('Verified')
                    this.props.appActions.getConstruction(this.props.constructionId)
                    this.isDisableClick = false;
                })
        }
        this._onClose();
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
                            <span style={{ color: '#fa6342' }}>Bạn có chắc xác nhận hóa đơn này?</span>
                            <div method="post">
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

export default ApprovedSubmitConstructionModal
