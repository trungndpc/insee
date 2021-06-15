import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { SideBar } from '../../../components/layout/SideBar'

class Loyalty extends React.Component {

    render() {
        return (
            <WebAppLayout {...this.props}>
                <section>
                    <div className="gap gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row merged20" id="page-contents">
                                        <div className="col-lg-3">
                                            <SideBar />
                                        </div>
                                        <div style={{ padding: 0 }} className="col-lg-9">
                                            <div className="loadMore">
                                                <div className="m-content loyalty">
                                                    <div className="central-meta">
                                                        <div className="about">
                                                            <div className="personal">
                                                                <h5 className="f-title ">CHƯƠNG TRÌNH TÍCH LŨY</h5>
                                                                <div className="line-bt" />

                                                                <div className="ton-info">
                                                                    <h5 className="ton-title">Số tấn đã tích lũy</h5>
                                                                    <h3 className="ton">250 <span style={{ fontSize: '20px' }}> tấn</span></h3>
                                                                </div>

                                                                <div className="ton-process">
                                                                    <ul className="cdt-step-progressbar horizontal">
                                                                        <li  className="active " style={{width: '20%'}}>
                                                                            <span className="indicator"></span>
                                                                            <span className="title">Công trình đầu tiên</span>
                                                                        </li>
                                                                        <li className="active " style={{width: '20%'}}>
                                                                            <span className="indicator"></span>
                                                                            <span className="title">100</span>
                                                                        </li>
                                                                        <li className="active fix-last-active" style={{width: '25%'}}>
                                                                            <span className="indicator"></span>
                                                                            <span className="title">200</span>
                                                                        </li>
                                                                        <li style={{width: '25%'}}>
                                                                            <span className="indicator"></span>
                                                                            <span className="title">350</span>
                                                                        </li>
                                                                        <li style={{width: '25%'}}>
                                                                            <span className="indicator"></span>
                                                                            <span className="title">500</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="desc">
                                                                    <h4>Phần Thưởng</h4>
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="tb-point">Công trình đầu tiên</td>
                                                                                <td>Tặng thẻ điện thoại 40,000 hoặc 50,000 VND cho mỗi tấn xi măng INSEE Power-S hoặc INSEE Wall Pro (tối đa 400k và 500k một công trình)</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="tb-point">100 tấn</td>
                                                                                <td>Phiếu điện máy xanh trị giá 1,000,000 VND</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="tb-point">250 tấn</td>
                                                                                <td>Phiếu điện máy xanh trị giá 3,000,000 VND</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="tb-point">500 tấn</td>
                                                                                <td>Phiếu điện máy xanh trị giá 5,000,000 VND</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="tb-point">{`> 500 tấn`}</td>
                                                                                <td>Phiếu điện máy xanh trị giá 7,000,000 VND</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </WebAppLayout>
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
)(Loyalty)
