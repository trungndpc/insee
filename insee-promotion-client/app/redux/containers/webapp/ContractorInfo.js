import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { UserRole } from '../../../components/enum/UserRole'
import { CustomerStatus } from '../../../components/enum/CustomerStatus'
import { City } from '../../../data/Location'
import { ContentSideBar } from '../../../components/layout/SideBar'
const FollowWidget = React.lazy(() => import('../../../components/FollowWidget'));

class ContractorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showQRCode: false
        }
        this.toggleQRCode = this.toggleQRCode.bind(this)
    }

    toggleQRCode() {
        this.setState({
            showQRCode: !this.state.showQRCode
        })
    }

    render() {
        const user = this.props.app.user;
        const contractor = user && user.customer;
        return (
            <div>
                {this.state.showQRCode && <QRCodeModal outClick={this.toggleQRCode} user={user} />}
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
                                                        <ContentSideBar />
                                                    </div>
                                                </aside>
                                            </div>{/* sidebar */}
                                            <div className="col-lg-9">
                                                <div className="loadMore">
                                                    <div className="m-content">

                                                        {user && !user.follower &&
                                                            <div className="central-meta">
                                                                <Suspense fallback={<div>Loading...</div>}>
                                                                    <FollowWidget {...this.props} />
                                                                </Suspense>
                                                            </div>
                                                        }
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
                                                                                <th>Mã giới thiệu</th>
                                                                                <td onClick={this.toggleQRCode}>{user.referralCode}<i style={{ marginLeft: '10px' }} className="fa fa-qrcode"></i></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                }
                                                            </div>
                                                        </div>

                                                        {contractor && <div className="central-meta">
                                                            <div className="about">
                                                                <div className="personal">
                                                                    <h5 className="f-title">THÔNG TIN CHI TIẾT</h5>
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
                                                                                <th>Khu vực</th>
                                                                                <td>{City.getName(contractor.mainAreaId)}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Trạng thái</th>
                                                                                <td style={{ color: `${CustomerStatus.findByStatus(contractor.status).getColor()}` }}>
                                                                                    {CustomerStatus.findByStatus(contractor.status).getName()}
                                                                                </td>
                                                                            </tr>
                                                                            {contractor && contractor.volumeCiment > 0 &&
                                                                                <tr>
                                                                                    <th>Đã mua</th>
                                                                                    <td><span className="volume">{contractor.volumeCiment}</span> bao xi măng INSEE</td>
                                                                                </tr>
                                                                            }
                                                                            {/* {contractor.volumeCiment > 700 &&
                                                                                <tr>
                                                                                    <th>Chứng chỉ</th>
                                                                                    <td className="ntx">Nhà thầu xanh</td>
                                                                                </tr>
                                                                            } */}
                                                                            {contractor && contractor.note &&
                                                                                <tr>
                                                                                    <th>Ghi chú</th>
                                                                                    <td>{contractor.note}</td>
                                                                                </tr>
                                                                            }
                                                                            {contractor && contractor.point &&
                                                                                <tr>
                                                                                    <th>Điểm tích lũy</th>
                                                                                    <td>{contractor.point}</td>
                                                                                </tr>
                                                                            }
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
            </div>
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


class QRCodeModal extends React.PureComponent {

    constructor(props) {
        super(props)
        this.imgRef = React.createRef()
        this.justInit = true;
    }

    handleClick = (event) => {
        const { target } = event
        if (!this.imgRef.current.contains(target)) {
            if (!this.justInit) {
                this.props.outClick && this.props.outClick();
            }else {
                this.justInit = false;
            }
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick)
    }

    render() {
        const user = this.props.user;
        if (!user) return <div></div>
        return (
            <div className="modal-qrcode">
                <div><img ref={this.imgRef} src={`https://chart.googleapis.com/chart?cht=qr&chl=${user.referralCode}&chs=500x500&choe=UTF-8&chld=L|2`} /></div>
            </div>
        )
    }
}