import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom";


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
                        <div className="container-contact100-form-btn">
                    
                    <button onClick={this._onClickToZalo} id="btn-to-zalo" style={{ marginBottom: '20px' }} className="contact100-form-btn btn-default">
                                Quay lại Zalo
                    </button>
                    {customer && 
                    <Link style={{textAlign: 'center'}} className="contact100-form-btn" to={"/khach-hang/" + customer.id }>
                            Nhà thầu ngoại hạng
                    </Link>
                    }
                    
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

export default CompletedStep
