import React, { Component } from 'react'
import BirtdayInput from '../../../components/BirtdayInput'
import FormLayout from '../../../components/layout/FormLayout'
import { City } from '../../../data/Location';
import { RegisterForm } from '../../../common/ValidateForm'
import RegisterModel from '../../../model/RegisterModel'
import * as Error from '../../../common/Error'
import * as Message from '../../../common/Message'

class InfoStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this._submit = this._submit.bind(this)
        this._setErrorMessage = this._setErrorMessage.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getProfile();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            if (nextProps.app.user != null && nextProps.app.user && !this.props.app.user) {
                const user = nextProps.app.user;
                nextState.name = user.name;
                nextState.birthday = user.birthday
            }
        }
        return true;
    }

    _submit() {
        try {
            let data = {
                token: this.props.token,
                name: this.nameInputRef.value,
                location: parseInt(this.mainAreaRef.value),
            }
            let birthday = this.birthdayInputRef.getValue();
            if (RegisterForm.isValidBirthday(birthday)) {
                data.birthday = parseInt(birthday.value / 1000);
            }
            if (RegisterForm.isValid2Create(data)) {
                this.props.appActions.setStatusLoading(true);
                RegisterModel.updateCustomer(data)
                    .then((resp) => {
                        if (resp.error == Error.COMMON.SUCCESS) {
                            this.props.appActions.pushStateRegister(4);
                        } else {
                            this._setErrorMessage(Message.COMMON.REGISTER_FAILED)
                        }
                        this.props.appActions.setStatusLoading(false);
                    })
                    .catch((err) => {
                        this._setErrorMessage(Message.COMMON.NETWORK_ERORR)
                        this.props.appActions.setStatusLoading(false);
                    })
            }
        } catch (e) {
            this.setState({ errorMsg: e })
        }
    }

    _setErrorMessage(msg) {
        this.setState({ errorMsg: msg })
    }

    render() {
        return (
            <FormLayout {...this.props}>
                <span className="contact100-form-title">
                    Đăng ký
                     <div className="line-bt" />
                </span>
                <div className="form-description">Vui lòng nhập thông tin để tạo tài khoản</div>

                <div className="form-row">
                    <input ref={e => this.nameInputRef = e} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="insee-input" type="text" placeholder="Họ và tên" />
                </div>
                <div className="form-row">
                    <BirtdayInput default={this.state.birthday} ref={e => this.birthdayInputRef = e} />
                </div>
                <div className="form-row">
                    <select ref={e => this.mainAreaRef = e} className="insee-input" >
                        <option value={0}>Khu vực xây dựng</option>
                        {City.getList().map(function name(item, key) {
                            return <option key={key} value={item.key}>{item.value}</option>
                        })}
                    </select>
                </div>
                <div className="form-row prelative policy">
                    <input defaultChecked type="checkbox" />
                    <span> Tôi đã đọc và đồng ý các&ensp;<a href="#">điều khoản sử dụng và chính sách bảo mật </a>&ensp;của công ty </span>
                </div>
                {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}
                <div className="btn-container">
                    <button onClick={this._submit} className="btn-insee btn-insee-bg">Đăng ký</button>
                </div>
            </FormLayout>
        )
    }
}

export default InfoStep
