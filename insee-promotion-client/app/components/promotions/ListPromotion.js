import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import { City } from '../../data/Location'
import DateTimeUtil from '../../utils/DateTimeUtil'
import MessageError from '../../components/MessageError'
import ErrorHelper from '../../components/ErrorHelper'
class ListPromotion extends Component {

    componentDidMount() {
        this.props.appActions.getListPromotion();
    }


    renderLocation(arr) {
        return ;
    }

    render() {
        const promotion = this.props.app.promotion;
        const error = promotion && promotion.error;
        const list = promotion && promotion.list;
        return (
            <div className="loadMore">
                <div className="m-content post">
                    <div className="row">
                        {!ErrorHelper.isSuccess(error) && <div className="empty-container"><p>{MessageError.getMsg(error)}</p></div>}
                        {ErrorHelper.isSuccess(error) && list && list.length == 0 && <div className="empty-container"><p>Chưa có chương trình khuyến mãi dành cho khu vực của bạn</p></div>}
                        {ErrorHelper.isSuccess(error) && list && list.map((item, index) => {
                            return (
                                <div key={index} className="col-lg-6 col-sm-6">
                                    <div className="g-post-classic">
                                        <figure>
                                            <img alt="" src={item.cover} />
                                        </figure>
                                        <div className="g-post-meta">
                                            <div className="post-title no-border text-center-mobile">
                                                <h4><a href="#">{item.title}</a></h4>
                                                <p className="summary-rules">{`Thời gian áp dụng ${DateTimeUtil.toString(new Date(item.timeStart * 1000))} - ${DateTimeUtil.toString(new Date(item.timeEnd * 1000))}`}</p>
                                                <p className="summary-rules">{`Khu vực áp dụng: ${item.location.map(id => City.getName(id)).join(', ')}`}</p>
                                                <p className="post-summary">{item.summary}</p>
                                                <span className="p-date">
                                                    <Link to={'/khuyen-mai/' + item.id}>
                                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        {item.count > 0 && <span className="extra-infor-post">{`Đã tham gia ${item.count} lần`}</span>}
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
