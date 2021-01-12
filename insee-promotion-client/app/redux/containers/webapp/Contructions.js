import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import {SideBar} from '../../../components/layout/SideBar'
import ListConstruction from '../../../components/promotions/ListConstruction'
import DetailConstruction from '../../../components/promotions/DetailConstruction'

import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

function DetailConstructionRoute(props) {
    let { id } = useParams();
    return <DetailConstruction id={id} {...props} />
}


class Contructions extends React.Component {


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
                                                <Route path="/cong-trinh/:id">
                                                    <DetailConstructionRoute {...this.props} />
                                                </Route>
                                                <Route path="/cong-trinh">
                                                    <ListConstruction {...this.props} />
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
)(Contructions)
