import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import '../../../resources/webapp/css/main.css'
import '../../../resources/webapp/css/style.css';
import '../../../resources/webapp/css/color.css';
import '../../../resources/webapp/css/responsive.css';
import '../../../resources/webapp/css/me.css';
import PhoneUtil from '../../../utils/PhoneUtil'


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.login = this.login.bind(this)
    }

    componentDidMount() {
    }

    login() {
        let phone = this.phoneRef.value;
        if (!phone) {
            this.setState({ errorMsg: 'Vui lòng nhập số điện thoại' })
            return;
        }
        let pass = this.passRef.value;
        if (!pass) {
            this.setState({ errorMsg: 'Vui lòng nhập mật khẩu' });
            return;
        }
        phone = PhoneUtil.standardized(phone)
        let data = {
            phone: phone,
            pass: pass
        }
        this.props.appActions.login(data);
        return false;
    }

    render() {
        return (
            <div className="theme-layout">
                <div className="container-fluid pdng0">
                    <div className="row merged">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="land-featurearea">
                                <div className="land-meta">
                                    <h1>INSEE</h1>
                                    <p>INSEE use for as long as you want with two active projects.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="login-reg-bg">
                                <div className="log-reg-area sign">
                                    <h2 className="log-title">Login</h2>
                                    <form method="post">
                                        <div className="form-group">
                                            <input ref={e => this.phoneRef = e} type="tel" required="required" />
                                            <label className="control-label" >Phone</label><i className="mtrl-select" />
                                        </div>
                                        <div className="form-group">
                                            <input ref={e => this.passRef = e} type="password" required="required" />
                                            <label className="control-label">Password</label><i className="mtrl-select" />
                                        </div>
                                        <div className="errorMsg">
                                            {this.props.app.errorMsg && <p>{this.props.app.errorMsg}</p>}
                                        </div>
                                        <div className="submit-btns">
                                            <button onClick={this.login} className="mtr-btn signin" type="button"><span>Login</span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
