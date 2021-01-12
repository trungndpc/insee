import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'

class SendGiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(this.props.isOpen)
        }
        this._onClose = this._onClose.bind(this)
        this._onClickOK = this._onClickOK.bind(this)
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
        this.props.onClose && this.props.onClose()
    }

    _onClickOK() {
        let typeCard = this.typeCardRef.value;
        let seri = this.seriRef.value;
        let code = this.codeRef.value;
        let data = {
            typeCard: parseInt(typeCard),
            seri: seri,
            code: code,
            constructionId: this.props.id
        }
        this.props.appActions.createGift(data);
        this.props.onClose && this.props.onClose()
    }

    render() {
        const construction = this.props.app.construction;
        return (
            <div className={`popup-wraper3 ${this.state.isOpen && 'active'}`}>
                <div className="popup creat-group">
                    <span className="popup-closed"><i className="ti-close" /></span>
                    <div className="popup-meta">
                        <div className="popup-head">
                            <h5>Gửi quà tặng</h5>
                        </div>
                        <div className="group-adding">
                            <div className="friend-group">
                                <div className="change-photo">
                                    <figure><img src={construction.user.avatar} alt="" /></figure>
                                    <div className="edit-img">
                                        <p><span>Nhà thầu: </span> {construction.user.name}</p>
                                        <p><span>SDT: </span> {construction.user.phone}</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="form">
                                    <select ref={e => this.typeCardRef = e} className="modal-input">
                                        <option value="1">Vietel</option>
                                        <option value="2">Vinaphone</option>
                                        <option value="3">Mobile Phone</option>
                                    </select>
                                    <input ref={e => this.seriRef = e} type="text" className="modal-input" placeholder="Seri" />
                                    <input ref={e => this.codeRef = e} type="text" className="modal-input" placeholder="Code" />
                                    <div className="container-btn">
                                        <button onClick={this._onClickOK} className="main-btn">Đồng ý</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SendGiftModal
