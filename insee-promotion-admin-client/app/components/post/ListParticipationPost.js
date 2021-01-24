import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import DateTimeUtil from '../../utils/DateTimeUtil'
import {City} from '../../data/Location'
import * as StatusConstruction from '../enum/StatusConstruction'
class ListParticipationPost extends Component {

    componentDidMount() {
        this.props.appActions.getPromotionById(this.props.postId);
        this.props.appActions.getListParticipation(this.props.postId)
    }

    render() {
        const participations = this.props.app.pageParticipationPromotion;
        const promotion = this.props.app.promotion;
        console.log(promotion)
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="tab-content">
                        <div>
                            <h4>#{promotion && promotion.title}</h4>
                        </div>
                        <div className="tab-pane active fade show" id="frends">
                            <ul className="nearby-contct post">
                                {participations && participations.list && participations.list.map(function (item, key) {
                                    return (
                                        <li key={key}>
                                            <div className="nearly-pepls">
                                                <div className="pepl-info row">
                                                    <div className="col-md-1">
                                                        <figure>
                                                            <Link to={'/customer/' + item.user.customerId} ><img src={item.user.avatar} alt="" /></Link>
                                                        </figure>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <h4>{item.address}</h4>
                                                        <ul>
                                                            <li>{City.getName(item.city)}</li>
                                                            <li>{item.phone}</li>
                                                            <li>{StatusConstruction.findByStatus(item.status).getName()}</li>
                                                            <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-4 action">
                                                        <Link to={`/construction/${item.id}`} className="add-butn" data-ripple>Xem chi tiết</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                                {participations && participations.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}

                            </ul>
                            {/* <div className="lodmore"><button className="btn-view btn-load-more" /></div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListParticipationPost
