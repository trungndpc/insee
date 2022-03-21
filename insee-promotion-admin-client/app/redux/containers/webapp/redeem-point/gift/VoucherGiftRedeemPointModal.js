import React, { Component } from 'react'
import AppUtils from '../../../../../utils/AppUtils'
import { VOUCHER } from '../../../../../components/enum/TypeGift'
import CustomerModel from '../../../../../model/CustomerModel'
import GiftModel from '../../../../../model/GiftModel'
import AlertUtils from '../../../../../utils/AlertUtils'
import { TypeGiftRedeemPoint } from '../../../../../components/enum/TypeGiftRedeemPoint';



class VoucherGiftRedeemPointModal extends Component {

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
            type: VOUCHER.getType(),
            pointId: this.props.pointId,
        }

        let name = this.nameRef.value;
        if (!name) {
            this.setState({ errorMsg: 'Vui lòng nhập tên' })
            return;
        }
        data.amountPoint = this.props.typeGiftId;
        data.name = name;
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
                                    <input ref={e => this.nameRef = e} value={TypeGiftRedeemPoint.findById(this.props.typeGiftId).getName()} type="text" className="modal-input" placeholder="Tên quà tặng" />
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

export default VoucherGiftRedeemPointModal

