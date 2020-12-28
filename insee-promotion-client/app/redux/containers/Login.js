import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import Footer from '../../components/layout/Footer'

const minHeight = window.innerHeight - 86;
class Login extends React.Component {

    constructor(props) {
        super(props)
    }

 
    onClickLoginZalo() {
        window.location.href = "https://insee-promotion.herokuapp.com/authen/zalo?redirectUrl=" + encodeURIComponent('https://insee-promotion.herokuapp.com/khach-hang')
    }
  

    render() {
        return (
            <div className="container-contact100 login-page">
                <div className="wrap-contact100">
                    <div style={{minHeight: minHeight+ 'px'}} className="contact100-form validate-form form">
                        <span className="contact100-form-title">Đăng nhập<div className="line-bt" /> </span>
                        <div className="form-container">
                            <div className="input-shell">
                                <img src={require('../../resources/images/icon-phone.png')} />
                                <input ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Vui lòng nhập số điện thoại" type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                            </div>
                            <div className="input-shell login-password">
                                <input ref={e => this.phoneInputRef = e} onChange={this._onChangeInputPhone} placeholder="Nhập mật khẩu đăng nhập" type="password" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" />
                            </div>
                            <div style={{height: '40px'}}>
                        </div>
                        </div>

                        <div className="btn-container">
                            <button className="btn-insee btn-insee-bg">Đăng nhập</button>
                        </div>
                        <div className="or">
                            --OR--
                        </div>
                        <div onClick={this.onClickLoginZalo} className="btn-container btn-zalo-login">
                            <button className="btn-insee ">Đăng nhập bằng Zalo</button>
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
  