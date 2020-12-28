import React, { Component } from 'react'
import BirtdayInput from '../../../components/BirtdayInput'
import Footer from '../../../components/layout/Footer'
import {
    Link
} from "react-router-dom";

class InfoStep extends Component {

    constructor(props) {
        super(props)
        this._onClickSubmit = this._onClickSubmit.bind(this);
        this.state = {
            errorMsg: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            if (nextProps.app.register.statusStep3 < 0){
                nextState.errorMsg = "Đăng ký thất bại"
            }
        }
        return true;
    }


    _onClickSubmit() {
        let errorMsg = null;
        try {
            let name = this.nameInputRef.value;
            let password = this.passwordInputRef.value;
            let confirmPassword = this.confirmPasswordInputRef.value;

            if (!name) {
                errorMsg = 'Vui lòng nhập họ và tên'
                return;
            }

            let birthday = 0;
            let birthdayValue = this.birthdayInputRef.getValue();
            if (birthdayValue.error == 0) {
                birthday = birthdayValue.value;
            } else {
                errorMsg = birthdayValue.errorMsg;
                return;
            }

            if (!password) {
                errorMsg = 'Vui lòng nhập mật khẩu'
                return;
            }
            if (!confirmPassword) {
                errorMsg = 'Vui lòng xác nhận mật khẩu'
                return;
            }
            if (password != confirmPassword) {
                errorMsg = "Mật khẩu xác nhận không đúng"
                return;
            }
            let data = { ...this.props.app.register };
            data["birthday"] = parseInt(birthday / 1000);
            data["name"] = name;
            data["password"] = password;
            data["location"] = 1;
            this.props.appActions.updateCustomer(data);
        } finally {
            this.setState({errorMsg: errorMsg})
        }
    }

    render() {
        return (
            <div className="container-contact100 register_step3">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form">
                        <span className="contact100-form-title">
                            Đăng ký
                     <div className="line-bt" />
                        </span>
                        <div className="form-description">Vui lòng nhập thông tin để tạo tài khoản</div>

                        <div className="form-row">
                            <input ref={e => this.nameInputRef = e} className="insee-input" type="text"  placeholder="Họ và tên" />
                        </div>
                        <div className="form-row">
                            <BirtdayInput ref={e => this.birthdayInputRef = e} />
                        </div>
                        <div className="form-row">
                            <select className="insee-input" >
                                <option>Khu vực xây dựng</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <input ref={e => this.passwordInputRef = e} className="insee-input" type="password" placeholder="Mật khẩu đăng nhập" />
                        </div>
                        <div className="form-row">
                            <input ref={e => this.confirmPasswordInputRef = e}  className="insee-input" type="password" placeholder="Xác nhận mẩu khẩu" />
                        </div>
                        <div className="form-row prelative policy">
                            <input checked type="checkbox"/>
                            <span>
                                Tôi đã đọc và đồng ý các&ensp;
                                <Link >
                                    điều khoản sử dụng và chính sách bảo mật
                                </Link>
                                &ensp;của công ty
                            </span>
                        </div>
                        {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div> }
                        <div className="btn-container">
                            <button onClick={this._onClickSubmit} className="btn-insee btn-insee-bg">Đăng ký</button>
                        </div>
                    </div>
                    <div className="bg-desktop contact100-more flex-col-c-m"></div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default InfoStep
