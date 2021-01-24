import React, { Component } from 'react'
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import Location from '../../data/Location'
import DateTimeUtil from '../../utils/DateTimeUtil'
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
                        {promotions && promotions.length == 0 && <div className="empty-container"><p>Chưa có chương trình khuyến mãi dành cho khu vực của bạn</p></div>} 
                        {promotions && promotions.map((item, index) => {
                            return (
                                <div className="col-lg-6 col-sm-6">
                                    <div className="g-post-classic">
                                        <figure>
                                            <img alt="" src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/promotion1.png'} />
                                        </figure>
                                        <div className="g-post-meta">
                                            <div className="post-title no-border text-center-mobile">
                                                <h4><a title href="#">{item.title}</a></h4>
                                                <p className="summary-rules">{`Thời gian áp dụng ${DateTimeUtil.toString(new Date(item.timeStart * 1000))} - ${DateTimeUtil.toString(new Date(item.timeEnd * 1000))}`}</p>
                                                <p className="summary-rules">{`Khu vực áp dụng: ${Location.getName(item.location)}`}</p>
                                                <p className="post-summary">{item.summary}</p>
                                                <span className="p-date">
                                                    <Link to={'/khuyen-mai/' + item.id}>
                                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        {item.count > 0 && <span className="extra-infor-post">{`Đã tham gia ${item.count} lần`}</span> }
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
