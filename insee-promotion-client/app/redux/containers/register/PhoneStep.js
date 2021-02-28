import React, { Component } from 'react'
import PhoneUtil from '../../../utils/PhoneUtil'
import FormLayout from '../../../components/layout/FormLayout'
import { RegisterForm } from '../../../common/ValidateForm'
import RegisterModel from '../../../model/RegisterModel'
import * as Error from '../../../common/Error'
import * as Message from '../../../common/Message'

class PhoneStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.phone = null;
        this._formatPhone = this._formatPhone.bind(this);
        this._submit = this._submit.bind(this);
        this._sendOTP = this._sendOTP.bind(this)
        this._setErrorMessage = this._setErrorMessage.bind(this)
    }

    _sendOTP() {
        this.props.firebase.sendOTP(this.phone, (err) => {
            this.props.appActions.setStatusLoading(false);
            if (err == Error.COMMON.SUCCESS) {
                this.props.setPhone(this.phone)
                this.props.appActions.pushStateRegister(2);
            } else {
                this._setErrorMessage(Message.OTP.SENDING_FAILED)
            }
        })
    }

    _submit() {
        try {
            let phone = this.phoneInputRef.value;
            if (RegisterForm.isValidPhone(phone)) {
                phone = PhoneUtil.standardized(phone);
                this.phone = phone;
                this.props.appActions.setStatusLoading(true);
                RegisterModel.checkPhone(phone)
                    .then(resp => {
                        if (resp.error == Error.COMMON.SUCCESS) {
                            this._sendOTP();
                        } else {
                            this._setErrorMessage(Message.PHONE.PHONE_EXITS)
                        }
                    })
                    .catch(err => {
                        this._setErrorMessage(Message.COMMON.UNKOWN_ERROR)
                    })
            }
        } catch (e) {
            this.setState({ errorMsg: e })
        }
    }

    _setErrorMessage(msg) {
        this.setState({ errorMsg: msg })
    }

    _formatPhone(e) {
        let value = e.target.value;
        value = PhoneUtil.format(value);
        if (value && value.length > 12) {
            return;
        }
        this.phoneInputRef.value = value;
    }

    render() {
        return (
            <FormLayout {...this.props} copyright={true}>
                <span className="contact100-form-title">Đăng ký<div className="line-bt" /> </span>
                <div className="form-container">
                    <div className="input-shell">
                        <img src={require('../../../resources/images/icon-phone.png')} />
                        <input ref={e => this.phoneInputRef = e} onChange={this._formatPhone} placeholder="Vui lòng nhập số điện thoại" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        {this.state.errorMsg && <span style={{ color: 'red', fontSize: 'medium' }}>*** {this.state.errorMsg}</span>}
                    </div>
                </div>

                <div className="btn-container">
                    <button onClick={this._submit} className="btn-insee btn-insee-bg">Đăng ký</button>
                </div>
            </FormLayout>
        )
    }
}

export default PhoneStep
