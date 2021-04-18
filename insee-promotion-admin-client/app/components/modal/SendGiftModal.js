import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'
import { TypeGift, CARD_PHONE, LUCKY_DRAW_ROTATION } from '../../components/enum/TypeGift'
import GiftModel from '../../model/GiftModel'

class SendGiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            numberCard: 1,
            errorMsg: null,
            typeGift: CARD_PHONE.getType(),
            giftName: null,
            deg: 0
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(this.props.isOpen)
        }
        this.cardInputRef = [];
        this._onClose = this._onClose.bind(this)
        this._onClickOK = this._onClickOK.bind(this)
        this.onChangeNumberCard = this.onChangeNumberCard.bind(this);
        this.getValueCard = this.getValueCard.bind(this);
        this._handleChangeTypeGift = this._handleChangeTypeGift.bind(this);
        this.randomGift = this.randomGift.bind(this)
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

    onChangeNumberCard(e) {
        this.setState({ numberCard: e.target.value })
    }

    _onClose() {
        AppUtils.toggleModal(false)
        this.props.onClose && this.props.onClose()
    }

    _onClickOK() {
        let data = {
            customerId: this.props.customerId,
            constructionId: this.props.constructionId,
            type : this.state.typeGift
        }
        if (this.state.typeGift == CARD_PHONE.getType()) {
            let name = this.nameRef.value;
            let cards = this.getValueCard();
            if (!name) {
                this.setState({ errorMsg: 'Vui lòng nhập tên' })
                return;

            }
            if (!cards) {
                this.setState({ errorMsg: 'Vui lòng nhập đủ thông tin các card' })
                return;
            }

            data.network = 1;
            data.name = name;
            data.cards = cards;
        }

        if (this.state.typeGift == LUCKY_DRAW_ROTATION.getType()) {
            data.name = 'Vòng quay may mắn'
            let deg = this.state.deg;
            if (!deg || deg == -1) {
                this.setState({ errorMsg: 'Vui lòng bấm random để chọn quà' })
                return;
            }
            data.rotation = {
                excepted : deg
            }
        }
        this.props.appActions.createGift(data);
        this.props.onClose && this.props.onClose();
    }

    _handleChangeTypeGift(event) {
        this.setState({ typeGift: event.target.value });
    }

    randomGift() {
        this.setState({ giftName: null, deg: null })
        GiftModel.randomGift()
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({ giftName: resp.data.name, deg: resp.data.deg })
                }
            })
    }

    getValueCard() {
        let rs = []
        for (var i = 1; i <= this.state.numberCard; i++) {
            let value = this.cardInputRef[i].getValue();
            if (!value) {
                return;
            }
            rs.push(value);
        }
        return rs;
    }

    initArr(value) {
        let arr = [];
        for (var i = 1; i <= value; i++) {
            arr.push(i);
        }
        return arr;
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
                                    <select onChange={this._handleChangeTypeGift} value={this.state.typeGift} className="modal-input">
                                        <option value="1">Thẻ cào</option>
                                        <option value="2">Vòng quay may mắn</option>
                                    </select>
                                    {this.state.typeGift == CARD_PHONE.getType() &&
                                        <div>
                                            <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Thẻ cào trị giá 5 triệu đồng" />
                                            <input ref={e => this.numberCardRef = e} onChange={this.onChangeNumberCard} value={this.state.numberCard} type="number" className="modal-input" placeholder="Số lượng thẻ" />
                                            {this.state.numberCard <= 5 && this.initArr(this.state.numberCard).map((id) => {
                                                return (
                                                    <ItemCard key={id} ref={e => this.cardInputRef[id] = e} />
                                                )
                                            })}
                                        </div>
                                    }
                                    {this.state.typeGift == LUCKY_DRAW_ROTATION.getType() &&
                                        <div className="lucky-rotaion-container">
                                            <div className="lucky-rotaion-name ">{this.state.giftName}</div>
                                            <button onClick={this.randomGift} className="main-btn">Random</button>
                                        </div>
                                    }
                                    <div style={{ textAlign: 'right' }} className="errorMsg"><p>{this.state.errorMsg && this.state.errorMsg}</p></div>
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

class ItemCard extends Component {
    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this)
    }

    getValue() {
        let network = this.typeCardRef.value;
        let name = this.nameRef.value;
        let seri = this.seriRef.value;
        let code = this.codeRef.value;
        if (!name || !seri || !code) {
            return;
        }
        return {
            name: name,
            seri: seri,
            code: code,
            network: network
        }
    }

    render() {
        return (
            <div className="gift-item">
                <select ref={e => this.typeCardRef = e} className="modal-input">
                    <option value="1">Vietel</option>
                    <option value="2">Vinaphone</option>
                    <option value="3">Mobile Phone</option>
                </select>
                <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Thẻ viettel 500" />
                <input ref={e => this.seriRef = e} type="text" className="modal-input" placeholder="Seri" />
                <input ref={e => this.codeRef = e} type="text" className="modal-input" placeholder="Code" />
            </div>
        )
    }
}