import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { SideBar } from '../../../components/layout/SideBar'
import WebUtil from '../../../utils/WebUtil'

class Share extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loyalty: null
        }
        this.openZaloFormShare = this.openZaloFormShare.bind(this)
    }

    componentDidMount() {
        this.openZaloFormShare();
    }

    openZaloFormShare() {
        const user = this.props.app.user;
        let url = process.env.DOMAIN + '/vung-xay-cuoc-song?code=' + user.referralCode;
        let urlEncoded = encodeURIComponent(url)
        if (WebUtil.isOSDevice()) {
            window.location.href = "zaloshareext://shareext?url=" + urlEncoded + "&type=8&version=1"
        }else {
            window.location.href = "intent://zaloapp.com/#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.SUBJECT=;S.android.intent.extra.TEXT=" + urlEncoded + ";B.hidePostFeed=false;B.backToSource=true;end"
        }
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
                                            <div className="loadMore">
                                                <div className="m-content loyalty">
                                                    <div className="central-meta">
                                                        <div className="about">
                                                            <div className="personal">
                                                                <h5 className="f-title" style={{paddingBottom: '0px'}}>GIỚI THIỆU THÀNH VIÊN</h5>
                                                                <div className="line-bt" />
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
)(Share)
