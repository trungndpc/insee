import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import ListPromotion from '../../../components/promotions/ListPromotion'
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import CreatePromotion from '../../../components/promotions/CreatePromotion'
import SideBar from '../../../components/layout/SideBar'

class Promotion extends React.Component {


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
                                            <SideBar />
                                        </div>
                                        <div className="col-lg-9">

                                            <Switch>
                                                <Route path="/promotion/create">
                                                    <CreatePromotion />
                                                </Route>
                                                <Route path="/promotion">
                                                    <div className="inbox-action ctkm">
                                                        <ul>
                                                            <li><Link to="/promotion/create"><span className="mbtn">Thêm</span></Link></li>
                                                        </ul>
                                                    </div>
                                                    <ListPromotion />
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
)(Promotion)
