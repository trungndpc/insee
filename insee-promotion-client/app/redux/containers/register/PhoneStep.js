import React, { Component } from 'react'
import PhoneUtil from '../../../utils/PhoneUtil'
import FirebaseUtil from '../../../utils/FirebaseUtil'

class PhoneStep extends Component {

    constructor(props) {
        super(props)
        this._onChangeInputPhone = this._onChangeInputPhone.bind(this);
        this._submit = this._submit.bind(this);
    }

    _onChangeInputPhone(e) {
        let value = e.target.value;
        value = PhoneUtil.format(value);
        if (value) {
            this.phoneInputRef.value = value;
        }
    }

    _submit() {
        let phone = this.phoneInputRef.value;
        if (!phone) {
            console.log("Please input phone number")
            return;
        }
        window.recaptchaVerifier = FirebaseUtil.recaptcha();
        phone = PhoneUtil.standardized(phone);
        this.phone = phone;
        this.props.appActions.checkPhone(phone);
    }

    render() {
        return (
            <div className="container-contact100 regiser phone_step">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form form">
                        <span className="contact100-form-title">Đăng ký<div className="line-bt" /> </span>
                        <div className="wrap-input100 ">
                            <input id="sdt" ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Vui lòng nhập số điện thoại" className="input100" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                            <span className="focus-input100" />
                        </div>
                        <div id="btn-submit-phone" className="container-contact100-form-btn">
                            <button onClick={this._submit} id="btn-register-phone" className="contact100-form-btn">Đăng ký</button>
                        </div>
                    </div>
                    <div className="contact100-more flex-col-c-m" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
                    </div>
                </div>
                <div className="footer">
                    <p>INSEE</p>
                </div>
            </div>
        )
    }
}

export default PhoneStep
