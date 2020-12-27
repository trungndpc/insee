import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import Footer from '../../../components/layout/Footer'

class CompletedStep extends Component {

    constructor(props) {
        super(props)
    }

    _onClickToZalo() {
        window.location.href = "https://zalo.me/428332895304538762"
        return false;
    }


    render() {
        const customer = this.props.app.register.customer;
        return (
            <div className="container-contact100 regiser complete">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form">
                        <span className="contact100-form-title">
                            Hoàn tất đăng ký
                            <div className="line-bt" />
                        </span>
                        <div className="form-description">Đơn đăng ký đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi tin nhắn xác nhận trong vòng 24 giờ</div>
                        <div className="btn-container btn-to-zalo">
                            <button onClick={this._onClickToZalo} className="btn-insee btn-default-none-bg">Quay lại Zalo</button>
                        </div>
                        <div className="btn-container">
                            <Link to={"/khach-hang"}>
                                <button className="btn-insee btn-insee-bg">Nhà thầu ngoại hạng</button>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-desktop contact100-more flex-col-c-m"></div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CompletedStep
