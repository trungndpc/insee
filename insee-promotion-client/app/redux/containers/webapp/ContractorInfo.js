import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import {UserRole} from '../../../components/enum/UserRole'
import {CustomerStatus} from '../../../components/enum/CustomerStatus'
import Location from '../../../data/Location'
class ContractorInfo extends React.Component {


    componentDidMount() {
    }

    render() {
        const contractor = this.props.app.customer;
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
                                            <aside className="sidebar static">
                                                <div className="widget">
                                                    <h4 className="widget-title">Thông tin</h4>
                                                    <ul className="naves">
                                                        <li>
                                                            <a href="newsfeed.html" >Thông tin tài khoản</a>
                                                        </li>
                                                        <li>
                                                            <a href="inbox.html" >Chương trình khuyễn mãi độc quyền</a>
                                                        </li>
                                                        <li>
                                                            <a href="fav-page.html" >Thiết kế hồ sơ nhà thầu</a>
                                                        </li>
                                                        <li>
                                                            <a href="fav-page.html" >Lịch sử nhận quà</a>
                                                        </li>
                                                    </ul>
                                                </div>{/* Shortcuts */}
                                            </aside>
                                        </div>{/* sidebar */}
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
                                                                            <th>Họ và tên</th>
                                                                            <td>{user.name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Vai trò</th>
                                                                            <td>{UserRole.findByRoleId(user.roleId).getName()}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Chứng chỉ</th>
                                                                            <td>Nhà thầu xanh</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Ghi chú</th>
                                                                            <td>{user.note}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            }
                                                        </div>
                                                    </div>

                                                    {contractor &&  <div className="central-meta">
                                                        <div className="about">
                                                            <div className="personal">
                                                                <h5 className="f-title">THÔNG TIN NHÀ THẦU</h5>
                                                            </div>
                                                            {contractor &&
                                                                <table className="table table-responsive table-info-contractor">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Nhà thầu</th>
                                                                            <td>{contractor.fullName}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>SDT</th>
                                                                            <td>{contractor.phone}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Khu vực thi công</th>
                                                                            <td>{Location.getName(contractor.mainAreaId)}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Trạng thái hồ sơ</th>
                                                                            <td style={{color: `${CustomerStatus.findByStatus(contractor.finalStatus).getColor()}`}}>
                                                                                {CustomerStatus.findByStatus(contractor.finalStatus).getName()}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Ghi chú</th>
                                                                            <td>{contractor.note}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            }
                                                        </div>
                                                    </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* centerl meta */}
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
