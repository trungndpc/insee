import React, { Component } from 'react'
import AppUtils from '../../../utils/AppUtils'
import { CARD_PHONE } from '../../../components/enum/TypeGift'
import CustomerModel from '../../../model/CustomerModel'
import { TypePhoneCard } from '../../enum/TypePhoneCard'
import GiftModel from '../../../model/GiftModel'
import AlertUtils from '../../../utils/AlertUtils'

class PhoneCardGiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            numberCard: 1,
            errorMsg: null,
            customer: null,
            value: 10
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(false)
        }
        this.cardInputRef = [];
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.callback = this.callback.bind(this)
        this.submit = this.submit.bind(this)
        this.loadCustomer = this.loadCustomer.bind(this)
        this.sumValue = this.sumValue.bind(this)
        this.onChangeCardInput = this.onChangeCardInput.bind(this)
        this.onChangeNumberCard = this.onChangeNumberCard.bind(this)
    }

    componentDidMount() {
        this.loadCustomer();
    }

    loadCustomer() {
        CustomerModel.get(this.props.customerId).
            then(resp => {
                if (resp.error == 0) {
                    this.setState({ customer: resp.data })
                }
            })
    }

    callback() {
        this.props.callback && this.props.callback()
    }

    open() {
        this.loadCustomer();
        AppUtils.toggleModal(true)
        this.setState({ isOpen: true })
    }

    close() {
        AppUtils.toggleModal(false)
        this.setState({ isOpen: false })
        this.callback();
    }

    submit() {
        let data = {
            customerId: Number(this.props.customerId),
            constructionId: this.props.constructionId,
            predictId: this.props.predictId,
            loyaltyId: this.props.loyaltyId,
            point: this.props.point,
            type: CARD_PHONE.getType()
        }

        let name = this.nameRef.value;
        let cards = Array.from(Array(this.state.numberCard).keys()).map(key => {
            return this.cardInputRef[key].getValue()
        }).filter(e => e);
        if (!name) {
            this.setState({ errorMsg: 'Vui lòng nhập tên' })
            return;
        }
        if (!cards || cards.length == 0 || cards.length != this.state.numberCard) {
            this.setState({ errorMsg: 'Vui lòng nhập đủ thông tin các card' })
            return;
        }
        let value = this.sumValue();
        if (this.props.maxValue && value > this.props.maxValue) {
            this.setState({ errorMsg: 'Giá trị toàn bộ thẻ cào không thể lớn hơn giá trị quy đổi' })
            return;
        }
        data.name = name;
        data.cards = cards;
        GiftModel.create(data)
            .then(resp => {
                if (resp.error == 0) {
                    AlertUtils.showSuccess("Thành công")
                } else {
                    AlertUtils.showError("Thất bại")
                }
                this.close()
            })
    }


    sumValue() {
        return Array.from(Array(this.state.numberCard).keys()).map(key => {
            return Number(this.cardInputRef[key].getValueMoney())
        }).reduce((a, b) => a + b, 0)
    }

    onChangeCardInput() {
        this.setState({ value: this.sumValue() })
    }

    onChangeNumberCard(e) {
        this.setState({ numberCard: Number(e.target.value) });
        setTimeout(function () {
            this.onChangeCardInput()
        }.bind(this), 500);
    }


    render() {
        const customer = this.state.customer;
        const maxValue = this.props.maxValue;
        return (
            <div className={`popup-wraper3 ${this.state.isOpen && 'active'}`}>
                <div className="popup creat-group">
                    <span className="popup-closed"><i className="ti-close" /></span>
                    <div className="popup-meta">
                        <div className="popup-head">
                            <h5>Thẻ cào điện thoại</h5>
                        </div>
                        <div className="group-adding">
                            <div className="friend-group">
                                <div className="change-photo">
                                    <figure><img src={customer && customer.avatar} alt="" /></figure>
                                    <div className="edit-img">
                                        <p><span>Nhà thầu: </span> {customer && customer.fullName}</p>
                                        <p><span>SDT: </span> {customer && customer.phone}</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div>
                                    <p style={{ textAlign: 'right', color: '#096dd9' }}>Giá trị thẻ cào <span style={{ fontWeight: '600' }}>{this.state.value}K {maxValue && `/ ${maxValue}K`}</span></p>
                                </div>
                                <div className="form">
                                    <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Thẻ cào trị giá 5 triệu đồng" />
                                    <input ref={e => this.numberCardRef = e} onChange={this.onChangeNumberCard} value={this.state.numberCard} type="number" className="modal-input" placeholder="Số lượng thẻ" />
                                    {this.state.numberCard < 5 && Array.from(Array(this.state.numberCard).keys()).map((key) => {
                                        return (
                                            <ItemCard onChange={this.onChangeCardInput} key={key} ref={e => this.cardInputRef[key] = e} />
                                        )
                                    })}
                                    <div style={{ textAlign: 'right' }} className="errorMsg"><p>{this.state.errorMsg && this.state.errorMsg}</p></div>
                                    <div className="container-btn">
                                        <button onClick={this.close} className="main-btn btn-close-s">Đóng</button>
                                        <button onClick={this.submit} className="main-btn">Đồng ý</button>
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

export default PhoneCardGiftModal

class ItemCard extends Component {
    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this)
        this.getValueMoney = this.getValueMoney.bind(this);
    }

    getValueMoney() {
        return this.valueCardRef.value;
    }

    getValue() {
        let network = this.typeCardRef.value;
        let seri = this.seriRef.value;
        let code = this.codeRef.value;
        let value = this.valueCardRef.value;
        if (!seri || !code) {
            return;
        }
        return {
            seri: seri,
            code: code,
            network: network,
            value: value * 1000
        }
    }

    render() {
        return (
            <div className="gift-item">
                <div className="col-70-network">
                    <select ref={e => this.typeCardRef = e} className="modal-input">
                        <option value={1}>Viettel</option>
                        <option value={2}>Vinaphone</option>
                        <option value={3}>Mobile Phone</option>
                    </select>
                </div>
                <div className="col-30-value">
                    <select onChange={() => { this.props.onChange() }} ref={e => this.valueCardRef = e} className="modal-input">
                        {TypePhoneCard.getList().map((item, key) => {
                            return (
                                <option key={key} value={item.getType()}>{item.getType()}</option>
                            )
                        })}
                    </select>
                </div>
                <input ref={e => this.seriRef = e} type="text" className="modal-input" placeholder="Seri" />
                <input ref={e => this.codeRef = e} type="text" className="modal-input" style={{ marginBottom: '0px' }} placeholder="Code" />
            </div>
        )
    }
}
