import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { SideBar } from '../../../components/layout/SideBar'



class GiftHistory extends React.Component {


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
                                        <div style={{ padding: 0 }} className="col-lg-9">
                                            <div className="history-promotion">
                                                <h4 className="title">INSEE Wall Pro</h4>
                                                <div className="content">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th>Công trình</th>
                                                                <td>Xô viết nghệ tỉnh - Hồ Chí Minh</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Quà tặng</th>
                                                                <td>Thẻ cào 500</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Trạng thái</th>
                                                                <td>Chờ nhận</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="history-promotion">
                                                <h4 className="title">Hóa đơn siêu cute</h4>
                                                <div className="content">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th>Công trình</th>
                                                                <td>Xô viết nghệ tỉnh - Hồ Chí Minh</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Quà tặng</th>
                                                                <td>Thẻ cào 200</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Trạng thái</th>
                                                                <td>Chờ nhận</td>
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
)(GiftHistory)
