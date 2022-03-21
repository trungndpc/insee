import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'

import {
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import ListRedeemPoint from './redeem-point/ListRedeemPoint'
import RedeemPointDetail from './redeem-point/RedeemPointDetail'

function RedeemPointDetaiRoute(props) {
    let { id } = useParams();
    return <RedeemPointDetail id={id} {...props} />
}


class RedeemPoint extends React.Component {

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
                                                <Route exact path="/redeem-point/:id">
                                                    <RedeemPointDetaiRoute {...this.props} />
                                                </Route>
                                                <Route path="/redeem-point">
                                                    <ListRedeemPoint {...this.props} />
                                                </Route>
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
)(RedeemPoint)
