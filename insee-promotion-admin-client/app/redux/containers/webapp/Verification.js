import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'


class Verification extends React.Component {


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
                                                                        <th scope="col">Chương trình</th>
                                                                        <th scope="col">Khách hàng</th>
                                                                        <th scope="col">Hình ảnh</th>
                                                                        <th scope="col">Trạng thái </th>
                                                                        <th scope="col">Thời gian</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>INSEE Wall Pro</td>
                                                                        <td>Nguyễn Văn Toàn</td>
                                                                        <td></td>
                                                                        <td>Chờ duyệt</td>
                                                                        <td>06/11/2020</td>
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
)(Verification)
