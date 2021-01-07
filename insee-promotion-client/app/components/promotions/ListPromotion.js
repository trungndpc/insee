import React, { Component } from 'react'
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

class ListPromotion extends Component {

    componentDidMount() {
        this.props.appActions.getListPromotion();
    }

    render() {
        let promotions = this.props.app.promotions;
        return (
            <div className="loadMore">
                <div className="m-content post">
                    <div className="row">
                        {promotions && promotions.list.map((item, index) => {
                            return (
                                <div className="col-lg-6 col-sm-6">
                                    <div className="g-post-classic">
                                        <figure>
                                            <img alt="" src={require('../../resources/images/promotion1.png')} />
                                        </figure>
                                        <div className="g-post-meta">
                                            <div className="post-title no-border text-center-mobile">
                                                <h4><a title href="#">{item.title}</a></h4>
                                                <p className="summary-rules">Thời gian: 15/02/2021 - 20/02/2021. Hồ Chí Minh</p>
                                                <p className="post-summary">{item.summary}</p>
                                                <span className="p-date">
                                                    <Link to={"/promotion/" + item.id}>
                                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        {/* <span className="extra-infor-post">Đã có 10 người tham gia chương trình</span> */}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPromotion
