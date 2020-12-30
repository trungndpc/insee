import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'


class ContractorInfo extends React.Component {


    componentDidMount() {
    }

    render() {
        const user = this.props.app.user;
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
                                                    <div className="central-meta">
                                                        <div className="about">
                                                            <div className="personal">
                                                                <h5 className="f-title">THÔNG TIN TÀI KHOẢN </h5>
                                                            </div>
                                                            {user &&
                                                                <table className="table table-responsive table-info-contractor">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Họ tên</th>
                                                                            <td>{user.name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Số điện thoại</th>
                                                                            <td>{user.phone}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            }
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
)(ContractorInfo)
