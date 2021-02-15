import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import FormLayout from '../../components/layout/FormLayout'
import PhoneUtil from '../../utils/PhoneUtil'
import WebUtil from '../../utils/WebUtil'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this._onClickLoginPass = this._onClickLoginPass.bind(this)
    }


    onClickLoginZalo() {
        window.location.href = "/authen/zalo?redirectUrl=" + encodeURIComponent(WebUtil.getCurrentDomain() + '/dang-nhap')
    }

    _onClickLoginPass() {
        let phone = this.phoneInputRef.value;
        let pass = this.passInputRef.value;
        if (!phone) {
            this.setState({errorMsg: 'Vui lòng nhập SDT'});
            return;
        }
        if (!pass) {
            this.setState({errorMsg: 'Vui lòng mật khẩu'});
            return;
        }
        phone = PhoneUtil.standardized(phone);
        this.props.appActions.loginWithPass({phone: phone, pass: pass})
        this.setState({errorMsg: null})
    }


    render() {
        return (
            <FormLayout copyright={true}>
                <span className="contact100-form-title">Đăng nhập<div className="line-bt" /> </span>
                {/* <div className="form-container">
                    <div className="input-shell">
                        <img src={require('../../resources/images/icon-phone.png')} />
                        <input ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Vui lòng nhập số điện thoại" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                    </div>
                    <div className="input-shell login-password">
                        <input ref={e => this.passInputRef = e} onChange={this._onChangeInputPhone} placeholder="Nhập mật khẩu đăng nhập" type="password" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                    </div>
                    <div style={{ height: '40px', fontSize: 'small', color: 'red' }}>
                        { (!this.state.errorMsg && this.props.app.loginPassErrorMsg) && this.props.app.loginPassErrorMsg}
                        {this.state.errorMsg && this.state.errorMsg}
                    </div>
                </div>

                <div className="btn-container">
                    <button onClick={this._onClickLoginPass} className="btn-insee btn-insee-bg">Đăng nhập</button>
                </div>
                <div className="or">
                    --OR--
                        </div> */}
                <div onClick={this.onClickLoginZalo} className="btn-container btn-zalo-login">
                    <button className="btn-insee ">Đăng nhập bằng Zalo</button>
                </div>
            </FormLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
