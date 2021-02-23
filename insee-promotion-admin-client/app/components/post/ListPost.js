import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import { StatusPost } from '../enum/StatusPost'
import DateTimeUtil from '../../utils/DateTimeUtil'
class ListPost extends Component {

    componentDidMount() {
        this.props.appActions.getListPromotion();
    }

    render() {
        let promotions = this.props.app.promotions;
        console.log(promotions)
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="row">
                        {(!promotions || promotions.list.length == 0) && <div className="col-md-12 no-post">Chưa có bài viết</div>}
                        {promotions && promotions.list.map((item, index) => {
                            return (
                                <div className="col-lg-6 col-sm-6">
                                    <div className="g-post-classic">
                                        <figure>
                                            <img alt="" src={item.cover} />
                                        </figure>
                                        <div className="g-post-meta">
                                            <div className="post-title">
                                                <h4><a title href="#">{item.title}</a></h4>
                                                <p className="post-summary">{item.summary}</p>
                                                <p className="post-status">{StatusPost.findBySatus(item.status).getName()} - {DateTimeUtil.diffTime(item.updatedTime)}</p>
                                                <span className="p-date">
                                                    <Link to={"/post/" + item.id}>
                                                        <button className="btn-apply-promotion" type="submit">Chi tiết</button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        {item.report && item.report.numberOfParticipants > 0 &&
                                            <Link to={'post/' + item.id + '/participation'}>
                                                <span className="extra-infor-post">Đã có {item.report.numberOfParticipants} người tham gia</span>
                                            </Link>
                                        }
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

export default ListPost
