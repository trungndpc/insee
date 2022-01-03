import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { SideBar } from '../../../components/layout/SideBar'
import LeaderBoard from '../../../components/promotions/LeaderBoard'
import CustomerModel from '../../../model/CustomerModel'
import { City } from '../../../data/Location'

class TopConstructor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tops: null
        }
    }

    componentDidMount() {
        CustomerModel.leaderBoard(0)
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({ tops: resp.data })
                }
            })
    }

    render() {
        const account = this.props.app.user && this.props.app.user.customer;
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
                                                                <h5 className="f-title" style={{ paddingBottom: '0px' }}>TOP NHÀ THẦU HÀNG ĐẦU</h5>
                                                                <div className="line-bt" style={{ marginBottom: '30px' }} />
                                                                {this.state.tops && account && <LeaderBoard location={City.getName(account.mainAreaId)} tops={this.state.tops} isFull={true} />}
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
)(TopConstructor)
