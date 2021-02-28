import React, { Component } from 'react'
import CountDown from '../../../components/CountDown'
import FormLayout from '../../../components/layout/FormLayout'
import OTPForm from '../../../components/OTPForm'
import * as Error from '../../../common/Error'
import * as Message from '../../../common/Message'
import RegisterModel from '../../../model/RegisterModel'

class OTPStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: null,
        }
        this.expires = this.expires.bind(this)
        this._sendOTP = this._sendOTP.bind(this)
        this._resetOTP = this._resetOTP.bind(this)
        this._submit = this._submit.bind(this)
        this._setErrorMessage = this._setErrorMessage.bind(this)
        this._resetErrorMessage = this._resetErrorMessage.bind(this)
        this._nextStep = this._nextStep.bind(this)
    }

    componentDidMount() {
        this.countDownRef.reset();
    }

    expires() {
        this._setErrorMessage(Message.OTP.EXPIRED_OTP)
    }

    _sendOTP() {
        this.props.appActions.setStatusLoading(true);
        this.props.firebase.sendOTP(this.props.phone, (err) => {
            this.props.appActions.setStatusLoading(false);
            if (err == Error.COMMON.SUCCESS) {
                this.countDownRef.reset();
            } else {
                this._setErrorMessage(Message.OTP.SENDING_FAILED)
            }
        })
    }

    _resetOTP() {
        this._sendOTP();
        this.optForm.reset()
        this._resetErrorMessage()
    }

    _submit() {
        if (!this.countDownRef.isExpired()) {
            this.props.appActions.setStatusLoading(true);
            this._resetErrorMessage();
            let code = this.optForm.getValue();
            if (code == null || code.length < 6) {
                this.props.appActions.setStatusLoading(false);
                this._setErrorMessage(Message.OTP.PLEASE_INPUT_OTP)
                return;
            }
            this.props.firebase.confirm(code, (err, token) => {
                if (err == Error.COMMON.SUCCESS) {
                    token.user.getIdToken()
                        .then((idToken) => {
                            RegisterModel.login({ phone: this.props.phone, token: idToken })
                                .then((resp) => {
                                    this.props.appActions.setStatusLoading(false);
                                    if (resp.error == Error.COMMON.SUCCESS) {
                                        this._nextStep(idToken)
                                    } else {
                                        this._setErrorMessage(Message.COMMON.NETWORK_ERORR)
                                    }
                                })
                                .catch((err) => {
                                    this._setErrorMessage(Message.COMMON.NETWORK_ERORR)
                                    this.props.appActions.setStatusLoading(false);
                                })
                        });
                } else {
                    this.props.appActions.setStatusLoading(false);
                    this._setErrorMessage(Message.OTP.WRONG_OTP)
                    this.optForm.reset()
                }
            })
        }
    }

    _setErrorMessage(msg) {
        this.setState({ errorMsg: msg })
    }

    _resetErrorMessage() {
        this.setState({ errorMsg: null })
    }

    _nextStep(token) {
        this.props.setToken(token)
        this.props.appActions.pushStateRegister(3);
    }

    render() {
        return (
            <FormLayout {...this.props}>
                <span className="contact100-form-title">
                    Nhập OTP
                    <div className="line-bt" />
                </span>
                <div className="form-description">Vui lòng nhập số OTP( được gửi đến SDT bạn) vào ô bên dưới và bấm xác nhận
                            để hoàn tất truy cập vào hệ thống</div>

                <div className="form-center">
                    <div style={{ padding: '20px 10px' }}>
                        <CountDown ref={e => this.countDownRef = e} count={120} done={this.expires} />
                    </div>
                    {this.state.errorMsg && <div className="error-msg">{this.state.errorMsg}</div>}
                    <OTPForm ref={e => this.optForm = e} />
                </div>
                <div className="btn-container center">
                    <div className="btn-retry-send-code">
                        <button onClick={this._resetOTP} className="btn-insee btn-default-none-bg">Gửi lại mã</button>
                    </div>
                    <div className="btn-submit-otp">
                        <button onClick={this._submit} className="btn-insee btn-insee-bg">Đăng ký</button>
                    </div>
                </div>
            </FormLayout>
        )
    }
}

export default OTPStep
