import React, { Component } from 'react'
import AppUtils from '../../../utils/AppUtils'
import { VOUCHER } from '../../enum/TypeGift'
import CustomerModel from '../../../model/CustomerModel'
import GiftModel from '../../../model/GiftModel'
import AlertUtils from '../../../utils/AlertUtils'

class VoucherGiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            numberVoucher: 1,
            errorMsg: null,
            customer: null,
            value: 10
        }
        if (this.props.isOpen) {
            AppUtils.toggleModal(false)
        }
        this.voucherInputRef = [];
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.callback = this.callback.bind(this)
        this.submit = this.submit.bind(this)
        this.loadCustomer = this.loadCustomer.bind(this)
        this.onChangeNumber = this.onChangeNumber.bind(this)
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
            type: VOUCHER.getType()
        }

        let name = this.nameRef.value;
        let vouchers = Array.from(Array(this.state.numberVoucher).keys()).map(key => {
            return this.voucherInputRef[key].getValue()
        }).filter(e => e);
        if (!name) {
            this.setState({ errorMsg: 'Vui lòng nhập tên' })
            return;
        }
        if (!vouchers || vouchers.length == 0 || vouchers.length != this.state.numberVoucher) {
            this.setState({ errorMsg: 'Vui lòng nhập đủ thông tin các voucher' })
            return;
        }
        data.name = name;
        data.vouchers = vouchers;
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

    onChangeNumber(e) {
        this.setState({ numberVoucher: Number(e.target.value) });
    }


    render() {
        const customer = this.state.customer;
        return (
            <div className={`popup-wraper3 ${this.state.isOpen && 'active'}`}>
                <div className="popup creat-group">
                    <span className="popup-closed"><i className="ti-close" /></span>
                    <div className="popup-meta">
                        <div className="popup-head">
                            <h5>Quà tặng trực tiếp</h5>
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
                                <div className="form">
                                    <input ref={e => this.nameRef = e} type="text" className="modal-input" placeholder="Tên quà tặng" />
                                    <input ref={e => this.numberVoucherCardRef = e} onChange={this.onChangeNumber} value={this.state.numberVoucher} type="number" className="modal-input" placeholder="Số Voucher" />
                                    {this.state.numberVoucher < 5 && Array.from(Array(this.state.numberVoucher).keys()).map((key) => {
                                        return (
                                            <ItemVoucher key={key} ref={e => this.voucherInputRef[key] = e} />
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

export default VoucherGiftModal


class ItemVoucher extends Component {
    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this)
    }

    getValue() {
        let voucher = this.voucherRef.value;
        let quantity = this.numberVoucherItem.value;
        if (!voucher || !quantity) {
            return;
        }
        return {
            name: voucher,
            quantity: quantity,
        }
    }

    render() {
        return (
            <div className="gift-item">
                <select ref={e => this.voucherRef = e} className="modal-input">
                    <option value="1">Điện máy xanh 20%</option>
                    <option value="2">Mũ bảo hiểm VINA</option>
                    <option value="3">Nồi cơm điện</option>
                </select>
                <input ref={e => this.numberVoucherItem = e} style={{ marginBottom: '5px' }} type="text" className="modal-input" placeholder="Số lượng" />
            </div>
        )

    }
} 