import React, { Component } from 'react'
import FormLayout from '../../../components/layout/FormLayout'
import RegisterModel from '../../../model/RegisterModel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import Loading from '../../../components/layout/Loading'

class ReferralCodeStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.checkValid = this.checkValid.bind(this)
        this.onSkip = this.onSkip.bind(this)
    }


    _setErrorMessage(msg) {
        this.setState({ errorMsg: msg })
    }

    checkValid() {
        let code = this.referralCodeInputRef.value;
        if (!code) {
            this.setState({ errorMsg: 'Vui lòng nhập mã giới thiệu' })
            return;
        }
        this.props.appActions.setStatusLoading(true);
        RegisterModel.isValidReferralCode(code)
            .then(resp => {
                this.props.appActions.setStatusLoading(false);
                if (resp.error == 0) {
                    window.location.href = "/dang-ky?action=skip_referral_code&referral_code=" + code
                }else {
                    this.setState({ errorMsg: 'Mã giới thiệu không đúng' })
                }
            })
            .catch(err => {
                this.props.appActions.setStatusLoading(false);
                this.setState({ errorMsg: 'Có lỗi xảy ra, vui lòng kiểm tra đường truyền' })
            })
    }

    onSkip() {
        window.location.href = "/dang-ky?action=skip_referral_code"
    }


    render() {
        return (
            <FormLayout {...this.props} className="whitepg" copyright={true}>
                <span className="contact100-form-title">Mã giới thiệu<div className="line-bt" /> </span>
                <div style={{ marginTop: '40%' }}>
                    <div className="form-container form-referral">
                        <div className="input-refferal-code">
                            <input ref={e => this.referralCodeInputRef = e} placeholder="Nhập mã giới thiệu tại đây" type="number" />
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            {this.state.errorMsg && <span style={{ color: 'red', fontSize: 'medium' }}>*** {this.state.errorMsg}</span>}
                        </div>
                    </div>
                    
                    <div className="btn-container center">
                        <div className="btn-submit-otp">
                            <button onClick={this.checkValid} className="btn-insee btn-insee-bg">Xác nhận</button>
                        </div>
                        <div className="btn-retry-send-code btn-skip">
                            <button onClick={this.onSkip} className="btn-insee btn-default-none-bg">Bỏ qua</button>
                        </div>
                    </div>
                    <div className="form-referral note">
                        <p>*** Vui lòng nhấn nút bỏ qua nếu không có mã giới thiệu</p>
                    </div>
                </div>
                <Loading {...this.props} />
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
)(ReferralCodeStep)
