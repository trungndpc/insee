import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import DateTimeUtil from '../../utils/DateTimeUtil'
import { City } from '../../data/Location'
import * as StatusConstruction from '../enum/StatusConstruction'
import { Pagination } from 'antd';
class ListParticipationPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
          page: 1,
          pageSize: 10,
          status: -1,
        }
      }


    componentDidMount() {
        this.props.appActions.getPromotionById(this.props.postId);
        this.props.appActions.getListParticipation(this.props.postId)
    }

    render() {
        const page_participation = this.props.app.pageParticipationPromotion;
        const promotion = this.props.app.promotion;
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="tab-content">
                        <div>
                            <h4>#{promotion && promotion.title}</h4>
                        </div>
                        <div className="tab-pane active fade show" id="frends">
                            <ul className="nearby-contct post">
                                {page_participation && page_participation.list && page_participation.list.map(function (item, key) {
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
                                {page_participation && page_participation.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}
                            </ul>
                            <div className="paging-container">
                                <Pagination defaultCurrent={1} current={this.state.page} total={page_participation.totalPage * page_participation.pageSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListParticipationPost
