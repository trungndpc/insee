import React, { Component } from 'react'
import PhoneUtil from '../../../utils/PhoneUtil'
import FirebaseUtil from '../../../utils/FirebaseUtil'
import Footer from '../../../components/layout/Footer'

class PhoneStep extends Component {

    constructor(props) {
        super(props)
        this._onChangeInputPhone = this._onChangeInputPhone.bind(this);
        this._submit = this._submit.bind(this);
        this.state = {
            errorMsg: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            if (nextProps.app.register.statusStep1 == 1) {
                nextState.errorMsg = "Số điện thoại đã được đăng ký"
            }
        }
        return true;
    }

    _onChangeInputPhone(e) {
        let value = e.target.value;
        value = PhoneUtil.format(value);
        if (value) {
            if(value.length > 12) {
                return;
            }
            this.phoneInputRef.value = value;
        }
    }

    _submit() {
        let phone = this.phoneInputRef.value;
        if (!phone) {
            this.setState({errorMsg: "Vui lòng nhập số điện thoại của bạn"})
            return;
        }
        window.recaptchaVerifier = FirebaseUtil.recaptcha();
        phone = PhoneUtil.standardized(phone);
        this.phone = phone;
        this.props.appActions.checkPhone(phone);
    }

    render() {
        const isLoading = this.props.app.register.isLoading;
        return (
            <div className="container-contact100 regiser phone_step">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form form">
                        <span className="contact100-form-title">Đăng ký<div className="line-bt" /> </span>
                        <div className="form-container">
                            <div className="input-shell">
                                <img src={require('../../../resources/images/icon-phone.png')} />
                                <input ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Vui lòng nhập số điện thoại" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                            </div>
                            <div style={{height: '40px'}}>
                            {(!isLoading && this.state.errorMsg)  && <span style={{color: 'red', fontSize: 'small'}}>*** {this.state.errorMsg}</span> }
                        </div>
                        </div>

                        <div className="btn-container">
                            <button onClick={this._submit} className="btn-insee btn-insee-bg">Đăng ký</button>
                        </div>
                    </div>
                    <div className="bg-desktop contact100-more flex-col-c-m"></div>
                </div>
                <div className="footer-desc">
                        <p style={{lineHeight: '10px'}}>Nền tảng chính thức của nhà thuần INSEE Việt Nam</p>
                        <p>Copyright Siam City Cerment (Vietnam) Ltd.</p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default PhoneStep
