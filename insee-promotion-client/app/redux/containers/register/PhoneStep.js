import React, { Component } from 'react'
import PhoneUtil from '../../../utils/PhoneUtil'
import FormLayout from '../../../components/layout/FormLayout'
import { RegisterForm } from '../../../common/ValidateForm'

class PhoneStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this._onChangeInputPhone = this._onChangeInputPhone.bind(this);
        this._submit = this._submit.bind(this);
        this._sendOTP = this._sendOTP.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let currentError = this.props.app.register.error;
        let nextError = nextProps.app.register.error;
        if (currentError != nextError) {
            if (nextError == 0) {
                this.props.setPhone(this.phone)
                this._sendOTP();
            }else{
                nextState.errorMsg = "Số điện thoại đã được đăng ký"
            }
        }
        return true;
    }

    _onChangeInputPhone(e) {
        let value = e.target.value;
        value = PhoneUtil.format(value);
        if (value) {
            if (value.length > 12) {
                return;
            }
            this.phoneInputRef.value = value;
        }
    }

    _sendOTP() {
        this.props.firebase.sendOTP(this.phone, (err) => {
            if (err == 0) {
                this.props.appActions.pushStateRegister(2);
            } else {
                this.setState({ errorMsg: 'Có lỗi xảy ra trong quá trình gửi mã OTP đến số điện thoại này' })
            }
            this.props.appActions.setStatusLoading(false);
        })
    }

    _submit() {
        try {
            let phone = this.phoneInputRef.value;
            if (RegisterForm.isValidPhone(phone)) {
                phone = PhoneUtil.standardized(phone);
                this.props.appActions.setStatusLoading(true);
                this.props.appActions.checkPhone(phone);
                this.phone = phone;
            }
        } catch (e) {
            this.setState({ errorMsg: e })
        }
    }

    render() {
        return (
            <FormLayout {...this.props} copyright={true}>
                <span className="contact100-form-title">Đăng ký<div className="line-bt" /> </span>
                <div className="form-container">
                    <div className="input-shell">
                        <img src={require('../../../resources/images/icon-phone.png')} />
                        <input ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Vui lòng nhập số điện thoại" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                    </div>
                    <div style={{ marginTop: '40px'}}>
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
