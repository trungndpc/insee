import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { ContentSideBar } from '../../../components/layout/SideBar'
import LocationInput from '../../../components/promotions/LocationInput'

class Retailers extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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
                                                    </div>{/* Shortcuts */}
                                                </aside>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="loadMore">
                                                    <div className="m-content">
                                                        <div className="central-meta">
                                                            <div className="about">
                                                                <div className="personal">
                                                                    <h5 style={{ textAlign: 'center' }} className="f-title">CỬA HÀNG GẦN BẠN</h5>
                                                                </div>
                                                                <div className="form-row">
                                                                    <LocationInput ref={e => this.locationInputRef = e} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 retailers-rs">
                                        <div className="row merged20">
                                            <div className="loadMore">
                                                <div className="m-content">
                                                    {/* <div className="central-meta"> */}
                                                        <ul className="nearby-contct">
                                                            <li>
                                                                <div className="nearly-pepls">
                                                                    <div className="pepl-info">
                                                                        <h5 className="name-retailer">ANH KIET</h5>
                                                                        <p className="phone"><span className="icon fa fa-phone"></span>0972.797.184</p>
                                                                        <p><span className="icon fa fa-map-marker"></span>Ấp Long Bình A Xã Long Hưng - Huyện Châu Thành - Tiền Giang</p>
                                                                        {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="nearly-pepls">
                                                                    <div className="pepl-info">
                                                                        <h5 className="name-retailer">ANH KIET</h5>
                                                                        <p className="phone"><span className="icon fa fa-phone"></span>0972.797.184</p>
                                                                        <p><span className="icon fa fa-map-marker"></span>Ấp Long Bình A Xã Long Hưng - Huyện Châu Thành - Tiền Giang</p>
                                                                        {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="nearly-pepls">
                                                                    <div className="pepl-info">
                                                                        <h5 className="name-retailer">ANH KIET</h5>
                                                                        <p className="phone"><span className="icon fa fa-phone"></span>0972.797.184</p>
                                                                        <p><span className="icon fa fa-map-marker"></span>Ấp Long Bình A Xã Long Hưng - Huyện Châu Thành - Tiền Giang</p>
                                                                        {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="nearly-pepls">
                                                                    <div className="pepl-info">
                                                                        <h5 className="name-retailer">ANH KIET</h5>
                                                                        <p className="phone"><span className="icon fa fa-phone"></span>0972.797.184</p>
                                                                        <p><span className="icon fa fa-map-marker"></span>Ấp Long Bình A Xã Long Hưng - Huyện Châu Thành - Tiền Giang</p>
                                                                        {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="nearly-pepls">
                                                                    <div className="pepl-info">
                                                                        <h5 className="name-retailer">ANH KIET</h5>
                                                                        <p className="phone"><span className="icon fa fa-phone"></span>0972.797.184</p>
                                                                        <p><span className="icon fa fa-map-marker"></span>Ấp Long Bình A Xã Long Hưng - Huyện Châu Thành - Tiền Giang</p>
                                                                        {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
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
)(Retailers)

