import React, { Component } from 'react'
import FormLayout from '../../../components/layout/FormLayout'

class ReferralCodeStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }

    }


    _setErrorMessage(msg) {
        this.setState({ errorMsg: msg })
    }


    render() {
        return (
            <FormLayout {...this.props} copyright={true}>
                <span className="contact100-form-title">Mã giới thiệu<div className="line-bt" /> </span>
                <div style={{marginTop: '40%'}}>
                    <div className="form-container form-referral">
                        <div className="input-refferal-code">
                            <input placeholder="Nhập mã giới thiệu tại đây" type="number" />
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            {this.state.errorMsg && <span style={{ color: 'red', fontSize: 'medium' }}>*** {this.state.errorMsg}</span>}
                        </div>
                    </div>

                    <div className="btn-container center">
                        <div className="btn-submit-otp">
                            <button className="btn-insee btn-insee-bg">Xác nhận</button>
                        </div>
                        <div className="btn-retry-send-code btn-skip">
                            <button className="btn-insee btn-default-none-bg">Bỏ qua</button>
                        </div>
                    </div>
                </div>

            </FormLayout>
        )
    }
}

export default ReferralCodeStep
