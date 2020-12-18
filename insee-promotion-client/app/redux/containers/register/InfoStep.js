import React, { Component } from 'react'
import BirtdayInput from '../../../components/BirtdayInput'

class InfoStep extends Component {

    constructor(props) {
        super(props)
        this._onClickSubmit = this._onClickSubmit.bind(this);
    }

    _onClickSubmit() {
        let errorMsg = null;
        let birthday = 0;
        let birthdayValue = this.birthdayInputRef.getValue();
        if (birthdayValue.error == 0) {
            birthday = birthdayValue.value;
        }else {
            errorMsg = birthdayValue.errorMsg;
            return;
        }
        let name = this.nameInputRef.value;
        let password = this.passwordInputRef.value;
        let confirmPassword = this.confirmPasswordInputRef.value;
        
        if (!name) {
            errorMsg = 'Vui lòng nhập họ và tên'
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
        let data = {...this.props.app.register};
        data["birthday"] = birthday;
        data["name"] = name;
        data["password"] = password;
        data["location"] = 1;
        this.props.appActions.register(data);
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
                        <div className="wrap-input100">
                            <input ref={e => this.nameInputRef = e} id="name" className="input100" type="text" name="name" placeholder="Họ và tên" />
                            <span className="focus-input100" />
                        </div>
                        <BirtdayInput ref={e => this.birthdayInputRef = e} />
                        <div className="wrap-input100">
                            <input ref={e => this.passwordInputRef = e} id="name" className="input100" type="password" placeholder="Mật khẩu đăng nhập" />
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100">
                            <input ref={e => this.confirmPasswordInputRef = e} id="name" className="input100" type="password" placeholder="Xác nhận mẩu khẩu" />
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100 ">
                            <div>
                                <select className="js-select2 m-select" name="service">
                                    <option>Khu vực xây dựng</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <span className="focus-input100" />
                        </div>
                        <div className="container-contact100-form-btn">
                            <button onClick={this._onClickSubmit} id="btn-submit" className="contact100-form-btn">
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

export default InfoStep
