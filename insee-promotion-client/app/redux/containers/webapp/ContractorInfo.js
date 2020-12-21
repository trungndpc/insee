import React, { Component } from 'react'

class ContractorInfo extends Component {

    render() {
        const contractor = this.props.app.customer;
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="central-meta">
                        <div className="about">
                            <div className="personal">
                                <h5 className="f-title">THÔNG TIN TÀI KHOẢN </h5>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                <ul className="nav nav-tabs nav-tabs--vertical nav-tabs--left">
                                    <li className="nav-item">
                                        <a href="#basic" className="nav-link active" data-toggle="tab">Họ tên nhà thầu</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#location" className="nav-link" data-toggle="tab">Số điện thoại</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#work" className="nav-link" data-toggle="tab">Mật khẩu đăng nhập</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#interest" className="nav-link" data-toggle="tab">Khu vực thi công chính</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="basic">
                                        {contractor && 
                                        <ul className="basics">
                                            <li>{contractor.fullName}</li>
                                            <li>{contractor.phone}</li>
                                            <li>**********</li>
                                            <li>CẦN THƠ</li>
                                        </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* centerl meta */}
            </div>
        )
    }
}

export default ContractorInfo
