import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import ListPromotion from '../../../components/promotions/ListPromotion'
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import {SideBar} from '../../../components/layout/SideBar'
import DetailPromotion from '../../../components/promotions/DetailPromotion'


function DetailPromotionRoute(props) {
    let { postId } = useParams();
    return <DetailPromotion postId={postId} {...props} />
}


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
                                        <div style={{padding: 0}} className="col-lg-9">

                                            <Switch>
                                                <Route path="/khuyen-mai/:postId">
                                                    <DetailPromotionRoute {...this.props} />
                                                </Route>
                                                <Route path="/khuyen-mai">
                                                    <ListPromotion {...this.props} />
                                                </Route>
                                            </Switch>s
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
