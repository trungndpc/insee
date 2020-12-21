import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'


class Gift extends React.Component {


    componentDidMount() {
    }

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
                                        <div className="col-lg-9">
                                            <div className="loadMore">
                                                <div className="m-content">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-12">
                                                            <table className="table">
                                                                <thead className=" insee-color">
                                                                    <tr className="insee-color">
                                                                        <th scope="col">STT</th>
                                                                        <th scope="col">Chương trình khuyến mãi</th>
                                                                        <th scope="col">Quà tặng</th>
                                                                        <th scope="col">Số lượng</th>
                                                                        <th scope="col">Tình trạng</th>
                                                                        <th scope="col">Thời gian nhận quà</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>INSEE Wall Pro</td>
                                                                        <td>Thẻ điện thoại 100K</td>
                                                                        <td>2</td>
                                                                        <td>Đang duyệt</td>
                                                                        <td>06/11/2020</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">2</th>
                                                                        <td>INSEE Power-S</td>
                                                                        <td>Thẻ điện thoại 100K</td>
                                                                        <td>1</td>
                                                                        <td>Đã nhận</td>
                                                                        <td>30/10/2020</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">3</th>
                                                                        <td>Keo dán gạch INSEE Tilefix</td>
                                                                        <td>Voucher DMX 100K</td>
                                                                        <td>2</td>
                                                                        <td>Đã nhận</td>
                                                                        <td>28/10/2020</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">4</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">5</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">6</th>
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
)(Gift)
