import React, { Component } from 'react'

class InfoStep extends Component {


    render() {
        return (
            <div className="container-contact100 register_step3">
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form">
                        <span className="contact100-form-title">
                            Đăng ký
                  <div className="line-bt" />
                        </span>
                        <div className="form-description">Vui lòng nhập thông tin để tạo tài khoản</div>
                        <div className="wrap-input100">
                            <input id="name" className="input100" type="text" name="name" placeholder="Họ và tên" />
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100 wrap-input50">
                            <div>
                                <select className="js-select2 m-select" name="service">
                                    <option>Ngày sinh</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100 wrap-input50">
                            <div>
                                <select className="js-select2 m-select" name="service">
                                    <option>Tháng</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100 wrap-input50">
                            <div>
                                <select className="js-select2 m-select" name="service">
                                    <option>Năm</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <span className="focus-input100" />
                        </div>
                        <div className="wrap-input100">
                            <input id="name" className="input100" type="text" placeholder="Mật khẩu đăng nhập" />
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
                            <button id="btn-submit" className="contact100-form-btn">
                                Đăng ký
                            </button>
                        </div>
                    </form>
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
