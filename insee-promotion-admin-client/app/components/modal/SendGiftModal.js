import React, { Component } from 'react'
import AppUtils from '../../utils/AppUtils'
import { extend } from 'lodash'

class SendGiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            numberCard: 1,
            errorMsg: null
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(this.props.isOpen)
        }
        this.cardInputRef = [];
        this._onClose = this._onClose.bind(this)
        this._onClickOK = this._onClickOK.bind(this)
        this.onChangeNumberCard = this.onChangeNumberCard.bind(this);
        this.getValueCard = this.getValueCard.bind(this);
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
        this.setState({numberCard: e.target.value})
    }

    _onClose() {
        AppUtils.toggleModal(false)
        this.props.onClose && this.props.onClose()
    }

    _onClickOK() {
        let typeCard = this.typeCardRef.value;
        let name = this.nameRef.value;
        let cards = this.getValueCard();
        if (typeCard == 0 ) {
            this.setState({errorMsg: 'Vui lòng chọn loại thẻ'})
            return;
        }
        if (!name) {
            this.setState({errorMsg: 'Vui lòng nhập tên'})
            return;

        }
        if (!cards) {
            this.setState({errorMsg: 'Vui lòng nhập đủ thông tin các card'})
            return;
        }
        for(var card of cards) {
            card.network = parseInt(typeCard)
        }
        let data = {
            network: parseInt(typeCard),
            name: name,
            cards: cards,
            customerId: this.props.customerId,
            constructionId: this.props.constructionId,
        }
        this.props.appActions.createGift(data);
        this.props.onClose && this.props.onClose()
    }

    getValueCard() {
        let rs = []
        for(var i = 1; i <= this.state.numberCard; i++) {
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
        for(var i = 1; i <= value; i++) {
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
                                    <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Thẻ cào trị giá 5 triệu đồng" />
                                    <select ref={e => this.typeCardRef = e} className="modal-input">
                                        <option value="1">Vietel</option>
                                        <option value="2">Vinaphone</option>
                                        <option value="3">Mobile Phone</option>
                                    </select>
                                    <input ref={e => this.numberCardRef = e} onChange={this.onChangeNumberCard} value={this.state.numberCard} type="number" className="modal-input" placeholder="Số lượng thẻ" />
                                    {this.state.numberCard <= 3 && this.initArr(this.state.numberCard).map((id) => {
                                        return (
                                            <ItemCard key={id} ref={e => this.cardInputRef[id] = e} />
                                        )
                                    })}
                                    <div style={{textAlign: 'right'}} className="errorMsg"><p>{this.state.errorMsg && this.state.errorMsg}</p></div>
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
        let name = this.nameRef.value;
        let seri = this.seriRef.value;
        let code = this.codeRef.value;
        if (!name || !seri || !code) {
            return;
        }
        return {
            name: name,
            seri: seri,
            code: code
        }
    }

    render() {
        return (
            <div className="gift-item">
                <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Thẻ viettel 500" />
                <input ref={e => this.seriRef = e} type="text" className="modal-input" placeholder="Seri" />
                <input ref={e => this.codeRef = e} type="text" className="modal-input" placeholder="Code" />
            </div>
        )
    }
}