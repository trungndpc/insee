import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import '../../../resources/webapp/css/main.css'
import '../../../resources/webapp/css/style.css';
import '../../../resources/webapp/css/color.css';
import '../../../resources/webapp/css/responsive.css';
import '../../../resources/webapp/css/me.css';


class Login extends React.Component {

    componentDidMount() {
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
                                            <input type="text" id="input" required="required" />
                                            <label className="control-label" htmlFor="input">Username</label><i className="mtrl-select" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required="required" />
                                            <label className="control-label" htmlFor="input">Password</label><i className="mtrl-select" />
                                        </div>
                                        <div className="submit-btns">
                                            <button className="mtr-btn signin" type="button"><span>Login</span></button>
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
