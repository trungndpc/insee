import React, { Component } from 'react'
import BirtdayInput from '../../../components/BirtdayInput'
import FormLayout from '../../../components/layout/FormLayout'
import {
    Link
} from "react-router-dom";
import { City } from '../../../data/Location';
import { RegisterForm } from '../../../common/ValidateForm'

class InfoStep extends Component {

    constructor(props) {
        super(props)
        this._onClickSubmit = this._onClickSubmit.bind(this);
        this.state = {
            errorMsg: null
        }
    }

    componentDidMount() {
        this.props.appActions.getProfile();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props != nextProps) {
            if (nextProps.app.register.statusStep3 < 0) {
                nextState.errorMsg = "Đăng ký thất bại"
            }

            if (nextProps.app.user != null && nextProps.app.user && !this.props.app.user) {
                const user = nextProps.app.user;
                nextState.name = user.name;
                nextState.birthday = user.birthday
            }
        }
        return true;
    }


    _onClickSubmit() {
        try {
            let name = this.nameInputRef.value;
            let mainAreaId = this.mainAreaRef.value;
            let birthday = this.birthdayInputRef.getValue();

            let data = { ...this.props.app.register };
            if (RegisterForm.isValidBirthday(birthday)) {
                data["birthday"] = parseInt(birthday.value / 1000);
            }
            data["name"] = name;
            data["location"] = parseInt(mainAreaId);
 
            if (RegisterForm.isValid2Create(data)) {
                this.props.appActions.updateCustomer(data);
            }
        } catch (e) {
            this.setState({ errorMsg: e })
        }
    }

    toPolicy() {
        window.location.href = "https://ktl6lowkv2obj.vcdn.cloud/static/%C4%90i%E1%BB%81u+kho%E1%BA%A3n+s%E1%BB%AD+d%E1%BB%A5ng.docx"
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
                    <span> Tôi đã đọc và đồng ý các&ensp;<a href="#" onClick={this.toPolicy}>điều khoản sử dụng và chính sách bảo mật </a>&ensp;của công ty </span>
                </div>
                {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}
                <div className="btn-container">
                    <button onClick={this._onClickSubmit} className="btn-insee btn-insee-bg">Đăng ký</button>
                </div>
            </FormLayout>
        )
    }
}

export default InfoStep
