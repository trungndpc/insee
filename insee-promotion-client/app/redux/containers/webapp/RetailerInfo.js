import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { UserRole, RETAILER, CONTRUCTOR } from '../../../components/enum/UserRole'
import { CustomerStatus } from '../../../components/enum/CustomerStatus'
import { City } from '../../../data/Location'
import { ContentSideBar } from '../../../components/layout/SideBar'
import LoyaltyModel from '../../../model/LoyaltyModel'
import LoyaltyBoard from '../../../components/layout/LoyaltyBoard'
import { Link } from 'react-router-dom'
const FollowWidget = React.lazy(() => import('../../../components/FollowWidget'));

class RetailerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showQRCode: false,
            loyalty: null
        }
        this.toggleQRCode = this.toggleQRCode.bind(this)
        this.loadLoyalty = this.loadLoyalty.bind(this)
    }

    componentDidMount() {
        this.loadLoyalty()
    }

    toggleQRCode() {
        this.setState({
            showQRCode: !this.state.showQRCode
        })
    }

    loadLoyalty() {
        LoyaltyModel.me()
            .then(resp => {
                if (resp.error == 0 && resp.data.length > 0) {
                    this.setState({ loyalty: resp.data[0] })
                }
            })
    }



    render() {
        const user = this.props.app.user;
        const contractor = user && user.customer;
        const loyalty = this.state.loyalty;
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

                                                        {loyalty &&
                                                            <div className="about loyalty-main">
                                                                <div className="personal">
                                                                    <div className="central-meta">
                                                                        <LoyaltyBoard loyalty={loyalty} />
                                                                        <div style={{textAlign: 'center'}}>
                                                                            <Link to={'/khuyen-mai/' + loyalty.promotionId + '/loyalty'} style={{color: '#004085'}}>Xem chi tiết</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        }
                                                        {contractor && <div className="central-meta">
                                                            <div className="about">
                                                                <div className="personal">
                                                                    <h5 className="f-title">THÔNG TIN CHI TIẾT</h5>
                                                                </div>
                                                                {contractor &&
                                                                    <table className="table table-responsive table-info-contractor">
                                                                        <tbody>
                                                                            {user &&
                                                                                <tr>
                                                                                    <th>{user.roleId == CONTRUCTOR.getRoleId() ? 'Nhà thầu' : 'Cửa hàng'}</th>
                                                                                    <td>{contractor.fullName}</td>
                                                                                </tr>
                                                                            }
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
                                                                                <td>
                                                                                    {CustomerStatus.findByStatus(contractor.status).getName()}
                                                                                </td>
                                                                            </tr>
                                                                            {contractor && contractor.volumeCiment > 0 &&
                                                                                <tr>
                                                                                    <th>Đã mua</th>
                                                                                    <td><span className="volume">{contractor.volumeCiment}</span> bao xi măng INSEE</td>
                                                                                </tr>
                                                                            }
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
                                                                            {user &&
                                                                                <tr>
                                                                                    <th style={{color: '#28a745'}}>Mã giới thiệu</th>
                                                                                    <td style={{color: '#28a745'}} onClick={this.toggleQRCode}>{user.referralCode}<i style={{ marginLeft: '10px' }} className="fa fa-qrcode"></i></td>
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
)(RetailerInfo)

