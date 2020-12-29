import React, { Component } from 'react'
import FirebaseUtil from '../../../utils/FirebaseUtil'
import CountDown from '../../../components/CountDown'
import FormLayout from '../../../components/layout/FormLayout'


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
        data["phone"] = data["phone"];
        data["idToken"] = idToken;
        this.props.appActions.loginWithPhone(data);
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
            this.setState({ statusSending: SENDING_SMS })
            console.log("phone: " + phone)
            FirebaseUtil.sendSMS(window.recaptchaVerifier, phone, (err, confirmationResult) => {
                if (err == 0) {
                    this.setState({ statusSending: SENDING_SUCCESS })
                    this.countDownRef.reset();
                    this.confirmationResult = confirmationResult;
                } else {
                    this.setState({
                        statusSending: SENDING_FAILED,
                        smsError: -1,
                        errorMsg: "Gửi OTP thất bại, bạn vui lòng kiểm tra lại số điện thoại"
                    });
                }
            });
        }
    }

    _onClickResetSMSCode() {
        this.sendSMS();
        this.resetInput();

        this.state = {
            errorMsg: null,
            smsError: 0,
            statusSending: -1
        }
    }

    confirmFailed() {
        this.setState({
            smsError: -1,
            errorMsg: 'OTP sai vui lòng thử lại'
        })
        this.resetInput();
    }

    _onSubmitSMSCode() {
        if (this.state.smsError == 0 || this.state.smsError == -1) {
            console.log("_onSubmitSMSCode")
            this.setState({ errorMsg: null })
            let smsCode = this.getSMSCode();
            if (smsCode == null || smsCode.length < 6) {
                this.setState({ errorMsg: "Vui lòng nhập mã OTP" })
                return;
            }
            this.confirmationResult && FirebaseUtil.confirm(smsCode, this.confirmationResult, (result) => {
                result.user.getIdToken().then(function (idToken) {
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
        alert("OK2 ")
        return (
            <FormLayout>
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
                                (this.state.smsError == 0 || this.state.smsError == -1))
                            && <CountDown ref={e => this.countDownRef = e} count={60} done={this.counterEnd} />
                        }
                    </div>
                    {this.state.errorMsg && <div className="error-msg">{this.state.errorMsg}</div>}
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput1 = e} value={2}  onKeyPress={key => { this._onKeyPress(key, 1) }} className="input100" type="number" />
                    </div>
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput2 = e} value={2} inputmode="numeric" pattern="[0-9]*" onKeyPress={key => { this._onKeyPress(key, 2) }} className="input100" type="number" />
                    </div>
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput3 = e} inputmode="numeric" pattern="[0-9]*" onKeyPress={key => { this._onKeyPress(key, 3) }} className="input100" type="number" />
                    </div>
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput4 = e} inputmode="numeric" pattern="[0-9]*" onKeyPress={key => { this._onKeyPress(key, 4) }} className="input100" type="number"/>
                    </div>
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput5 = e} inputmode="numeric" pattern="[0-9]*" onKeyPress={key => { this._onKeyPress(key, 5) }} className="input100" type="number" />
                    </div>
                    <div className="wrap-input100 wrap-input25">
                        <input ref={e => this.smsCodeInput6 = e} inputmode="numeric" pattern="[0-9]*" onKeyPress={key => { this._onKeyPress(key, 6) }} className="input100" type="number" />
                    </div>
                </div>
                <div className="btn-container center">
                    <div className="btn-retry-send-code">
                        <button onClick={this._onClickResetSMSCode} className="btn-insee btn-default-none-bg">Gửi lại mã</button>
                    </div>
                    <div className="btn-submit-otp">
                        <button onClick={this._onSubmitSMSCode} className="btn-insee btn-insee-bg">Đăng ký</button>
                    </div>
                </div>
            </FormLayout>
        )
    }
}

export default OTPStep
