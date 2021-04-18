import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { City } from '../../../../data/Location'
import * as StatusConstruction from '../../../../components/enum/StatusConstruction'
import { NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2 } from '../../../../components/enum/TypeConstruction'
import { WAITING_APPROVAL, APPROVED, REJECTED, SEND_GIFT, RECIEVED } from '../../../../components/enum/StatusConstruction'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
class ListConstruction extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10,
      status: 0,
      type: NOW_CONSTRUCTION.getType()
    }
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeStatus = this.onChangeStatus.bind(this)
  }

  componentDidMount() {
    this.load(this.state.type, this.state.status)
  }

  onChangeType(event) {
    let type = event.target.value;
    this.setState({ type: type })
    this.load(type, this.state.status);
  }

  onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status });
    this.load(this.state.type, status);
  }

  load(type, status) {
    this.props.appActions.getListConstruction(type, status == 0 ? null : status);
  }

  render() {
    let constructions = this.props.app.constructions;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li>
                <label>Loại khuyến mãi</label>
                <select onChange={this.onChangeType} value={this.state.type} class="form-control">
                  <option value={NOW_CONSTRUCTION.getType()}>Upload hóa đơn (bags)</option>
                  <option value={NOW_CONSTRUCTION_V2.getType()}>Upload hóa đơn (VND)</option>
                  <option value={NEXT_CONSTRUCTION.getType()}>Công trình tiếp theo</option>
                </select>
              </li>
              <li>
                <label>Trạng thái</label>
                <select onChange={this.onChangeStatus.bind(this)} value={this.state.status} class="form-control">
                  <option value={0}>Tất cả</option>
                  <option value={WAITING_APPROVAL.getStatus()}>Chờ duyệt</option>
                  <option value={APPROVED.getStatus()}>Đã duyệt</option>
                  <option value={REJECTED.getStatus()}>Đã từ chối</option>
                  <option value={SEND_GIFT.getStatus()}>Đã gửi quà</option>
                  <option value={RECIEVED.getStatus()}>Đã nhận</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {constructions && constructions.list && constructions.list.map(function (item, key) {
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
                            {item.city && <li>{City.getName(item.city)}</li>}
                            <li>{item.phone}</li>
                            <li>{StatusConstruction.findByStatus(item.status).getName()}</li>
                            <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                          </ul>
                        </div>
                        <div className="col-md-4 action">
                          <Link to={`/construction/${item.id}`} className="add-butn" data-ripple>Chi tiết</Link>
                        </div>

                      </div>
                    </div>
                  </li>
                )
              })}
              {constructions && constructions.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}

            </ul>
            {/* <div className="lodmore"><button className="btn-view btn-load-more" /></div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ListConstruction
