import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'


class Home extends React.Component {

    render() {
        return (
            <WebAppLayout>
                <div className="theme-layout">
                    <section>
                        <div className="feature-photo">
                            <figure><img className="responsive" style={{objectFit: 'cover'}} src={require('../../../resources/images/banner.jpg')} alt="" /></figure>
                            <div className="container-fluid">
                                <div className="row merged">
                                    <div className="col-lg-2 col-4">
                                        <div className="user-avatar">
                                            <figure>
                                                <img src={require('../../../resources/webapp/images/user-avatar.jpg')} alt="" />
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-8">
                                        <div className="timeline-info">
                                            <ul>
                                                <li className="admin-name">
                                                    <h5>Nguyễn Đình Trung</h5>
                                                    <span>Tp Hồ Chí Minh</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{/* top area */}
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
                                                                <a href="newsfeed.html" title>Thông tin tài khoản</a>
                                                            </li>
                                                            <li>
                                                                <a href="inbox.html" title>Chương trình khuyễn mãi độc quyền</a>
                                                            </li>
                                                            <li>
                                                                <a href="fav-page.html" title>Thiết kế hồ sơ nhà thầu</a>
                                                            </li>
                                                            <li>
                                                                <a href="fav-page.html" title>Lịch sử nhận quà</a>
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
                                                                            <ul className="basics">
                                                                                <li>Nguyễn Đình Trung</li>
                                                                                <li>0972.797.184</li>
                                                                                <li>**********</li>
                                                                                <li>CẦN THƠ</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* centerl meta */}
                                                </div>
                                            </div>
                                        </div>{/* centerl meta */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section></div>
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
)(Home)
