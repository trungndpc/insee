import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import ContractorInfo from './ContractorInfo'

class Home extends React.Component {


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
                                            <ContractorInfo {...this.props} />
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
)(Home)
