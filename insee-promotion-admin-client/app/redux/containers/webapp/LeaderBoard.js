import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'

import {
    Switch,
    Route,
    useParams
} from "react-router-dom";
import ListCustomerBag from './leaderboard/ListCustomerBag'
import ListPredictFootballPoint from './leaderboard/ListPredictFootballPoint'

function ListPredictFootballPointRoute(props) {
    let { promotionId } = useParams();
    return <ListPredictFootballPoint promotionId={promotionId} {...props} />
}


class LeaderBoard extends React.Component {

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
                                        <div className="col-lg-9">
                                            <Switch>
                                                <Route path="/leaderboad/football/:promotionId">
                                                    <ListPredictFootballPointRoute {...this.props} />
                                                </Route>
                                                {/* <Route path="/leaderboad">
                                                    <ListCustomerBag {...this.props} />
                                                </Route> */}
                                            </Switch>
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
)(LeaderBoard)
