import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'
import Location from '../../../data/Location'
import DateTimeUtil from '../../../utils/DateTimeUtil'

class Contructions extends React.Component {


    componentDidMount() {
        this.props.appActions.getListConstruction();
    }

    render() {
        const constructions = this.props.app.constructions;
        console.log(constructions)
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
                                                {constructions && constructions.map(function (item, index) {
                                                    return (
                                                        <div key={index} className="central-meta item" style={{ display: 'inline-block' }}>
                                                            <div className="user-post">
                                                                <div className="friend-info">
                                                                    <div className="friend-name">
                                                                        <ins><a href="time-line.html">Công trình tại {Location.getName(item.city)} - Quân 12`</a></ins>
                                                                        <span>thời gian khởi công: {DateTimeUtil.formatMonth(new Date(item.estimateTimeStart * 1000))}</span>
                                                                    </div>
                                                                    <div className="post-meta">
                                                                        <img src="http://www.wpkixx.com/html/winku/images/resources/user-post6.jpg" alt="" />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                })}

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
)(Contructions)
