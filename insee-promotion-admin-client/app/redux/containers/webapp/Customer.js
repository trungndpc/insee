import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'
import ListCustomer from './customer/ListCustomer'
import CustomerDetail from './customer/CustomerDetail'
import {
    Switch,
    Route,
    useParams,
} from "react-router-dom";

function CustomerDetailRoute(props) {
    let { customerId } = useParams();
    return <CustomerDetail customerId={customerId} {...props} />
}

class Customer extends React.Component {

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
                                                <Route exact path="/customer/:customerId">
                                                    <CustomerDetailRoute {...this.props} />
                                                </Route>
                                                <Route path="/customer">
                                                    <ListCustomer {...this.props} />
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
)(Customer)
