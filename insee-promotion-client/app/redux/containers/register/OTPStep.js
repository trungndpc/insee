import React, { Component } from 'react'
import FirebaseUtil from '../../../utils/FirebaseUtil'
import CountDown from '../../../components/CountDown'

const SENDING_SMS = 1;
const SENDING_SUCCESS = 2;
const SENDING_FAILED = 3;

const FM_NAME_INPUT = "smsCodeInput";
class OTPStep extends Component {

    constructor(props) {
        super(props);
        this._onKeyPress = this._onKeyPress.bind(this);
        this.getSMSCode = this.getSMSCode.bind(this);
        this._onSubmitSMSCode = this._onSubmitSMSCode.bind(this);
        this.data = this.props.app.register;
        this.goToNextStep = this.goToNextStep.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.counterEnd = this.counterEnd.bind(this);
        this.sendSMS = this.sendSMS.bind(this);
        this._onClickResetSMSCode = this._onClickResetSMSCode.bind(this);
        this.confirmFailed = this.confirmFailed.bind(this);
        this.state = {
            errorMsg: null,
            smsError: 0,
            statusSending: -1
        }
    }

    componentDidMount() {
        this.sendSMS();
    }

    goToNextStep(idToken) {
        let data = { ...this.props.app.register }
        data["step"] = 3;
        data["idToken"] = idToken;
        console.log(data)
        this.props.appActions.pushRegisterData(data);
    }

    resetInput() {
        for (var i = 1; i <= 6; i++) {
            let inputRef = this[FM_NAME_INPUT + i];
            inputRef.value = '';
        }
    }
    sendSMS() {
        let phone = this.data["phone"];
        if (phone) {
            this.setState({statusSending: SENDING_SMS})            
            FirebaseUtil.sendSMS(window.recaptchaVerifier, phone, (err, confirmationResult) => {
                if (err == 0) {
                    this.setState({statusSending: SENDING_SUCCESS})            
                    console.log("send sms to: " + phone + " success")
                    this.confirmationResult = confirmationResult;
                }else {
                    this.setState({statusSending: SENDING_FAILED, 
                        smsError: -1, 
                        errorMsg: "Gửi OTP thất bại, bạn vui lòng kiểm tra lại số điện thoại"});
                }
            });
        }
    }

    _onClickResetSMSCode() {
        this.sendSMS();
        this.resetInput();
    }

    confirmFailed() {
        this.setState({
            smsError: -1,
            errorMsg: 'OTP sai vui lòng thử lại'
        })
        this.resetInput();
    }

    _onSubmitSMSCode() {
        if(this.state.smsError == 0 || this.state.smsError == -1) {
            console.log("_onSubmitSMSCode")
            this.setState({errorMsg: null})
            let smsCode = this.getSMSCode();
            this.confirmationResult && FirebaseUtil.confirm(smsCode, this.confirmationResult, (result) => {
                result.user.getIdToken().then(function(idToken) { 
                    this.goToNextStep(idToken);
                 }.bind(this));
            }, (error) => { 
                this.confirmFailed();
            })
        }
    }

    _onKeyPress(key, index) {
        var currentRef = this[FM_NAME_INPUT + index];
        currentRef.value = key;
        index = index + 1;
        if (index > 6) {
            return false;
        }
        var nextRef = this[FM_NAME_INPUT + index]
        nextRef.focus();
        return false;
    }

    getSMSCode() {
        let rs = "";
        for (var i = 1; i <= 6; i++) {
            let inputRef = this[FM_NAME_INPUT + i];
            let value = inputRef.value;
            if (!value) {
                return null;
            }
            rs = rs + value;
        }
        return rs;
    }

    counterEnd() {
        this.setState({
            smsError: -10,
            errorMsg: 'Mã OTP đã hết hạn, bấm Gửi Lại Mã để nhận OTP mới'
        });
    }

    render() {
        return (
            <div className="container-contact100 regiser otp">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form">
                        <span className="contact100-form-title">
                            Nhập OTP
                        <div className="line-bt" />
                        </span>
                        <div className="form-description">Vui lòng nhập số OTP( được gửi đến SDT bạn) vào ô bên dưới và bấm xác nhận
                            để hoàn tất truy cập vào hệ thống</div>

                        <div className="form-center">
                            <div> 
                            {
                                (this.state.statusSending == SENDING_SUCCESS && 
                                    ( this.state.smsError == 0 || this.state.smsError == -1 )) 
                                    && <CountDown count={60} done={this.counterEnd}/> 
                            }
                            </div>
                            {
                                (this.state.smsError != 0 && this.state.errorMsg ) && 
                                <div className="error-msg">
                                    {this.state.errorMsg}
                                </div>
                            }
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput1 = e} onKeyPress={key => { this._onKeyPress(key, 1) }} className="input100" type="number" />
                            </div>
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput2 = e} onKeyPress={key => { this._onKeyPress(key, 2) }} className="input100" type="number" />
                            </div>
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput3 = e} onKeyPress={key => { this._onKeyPress(key, 3) }} className="input100" type="number" />
                            </div>
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput4 = e} onKeyPress={key => { this._onKeyPress(key, 4) }} className="input100" type="number" />
                            </div>
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput5 = e} onKeyPress={key => { this._onKeyPress(key, 5) }} className="input100" type="number" />
                            </div>
                            <div className="wrap-input100 wrap-input25">
                                <input ref={e => this.smsCodeInput6 = e} onKeyPress={key => { this._onKeyPress(key, 6) }} className="input100" type="number" />
                            </div>
                        </div>
                        <div className="container-contact100-form-btn">
                            <button onClick={this._onClickResetSMSCode} className="contact100-form-btn contact30-form-btn btn-default">
                                Gửi lại mã
                            </button>
                            <button onClick={this._onSubmitSMSCode} id="btn-register" className="contact100-form-btn contact30-form-btn">
                                Đăng ký
                            </button>
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

export default OTPStep
