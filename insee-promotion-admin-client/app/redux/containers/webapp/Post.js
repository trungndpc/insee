import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import ListPost  from '../../../components/post/ListPost'
import DetailPost from '../../../components/post/DetailPost'
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import CreatePost from '../../../components/post/CreatePost'
import SideBar from '../../../components/layout/SideBar'


function DetailPromotionRoute(props) {
    let { postId } = useParams();
    return <DetailPromotion postId={postId} {...props} />
}


class Post extends React.Component {


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
                                                <Route exact path="/post/create">
                                                    <CreatePost {...this.props} />
                                                </Route>
                                                <Route path="/post/:postId">
                                                    <DetailPost {...this.props} />
                                                </Route>
                                                <Route path="/post">
                                                    <div className="inbox-action ctkm">
                                                        <ul>
                                                            <li><Link to="/post/create"><span className="mbtn">Thêm</span></Link></li>
                                                        </ul>
                                                    </div>
                                                    <ListPost {...this.props} />
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
)(Post)
