import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { City } from '../../../../data/Location'
import * as StatusConstruction from '../../../../components/enum/StatusConstruction'
import { NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2 } from '../../../../components/enum/TypeConstruction'
import { WAITING_APPROVAL, APPROVED, REJECTED, SEND_GIFT, RECIEVED } from '../../../../components/enum/StatusConstruction'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';

class ListConstruction extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10,
      status: 0,
      type: 0,
      phone: null
    }
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeStatus = this.onChangeStatus.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.search = this.search.bind(this);
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.load(this.state.type, this.state.status, this.state.page, this.state.pageSize)
  }

  onChangeType(event) {
    let type = event.target.value;
    this.setState({ type: type, page: 0, phone: null })
    this.load(type, this.state.status, 0, this.state.pageSize);
  }

  onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status, page: 0, phone: null })
    this.load(this.state.type, status, 0, this.state.pageSize);
  }

  onChangePhone(event) {
    let phone = event.target.value;
    this.setState({phone: phone})
    if (!phone) {
      this.load(this.state.type, this.state.status, this.state.page, this.state.pageSize)
    } else {
      this.setState({ status: 0, type: 0 })
      this.search(phone, 0, this.state.pageSize)
    }
  }

  onChangePage(pageNumber) {
    pageNumber = pageNumber - 1
    this.setState({ page: pageNumber })
    if (this.state.phone) {
      this.search(this.state.phone, pageNumber, this.state.pageSize)
    } else {
      this.load(this.state.type, this.state.status, this.state.page, this.state.pageSize)
    }
  }

  load(type, status, page, pageSize) {
    this.props.appActions.getListConstruction(type == 0 ? null : type, status == 0 ? null : status, page, pageSize);
  }

  search(phone, page, pageSize) {
    this.props.appActions.searchConstructionByPhoneCustomer(phone, page, pageSize)
  }

  render() {
    let constructions = this.props.app.constructions;
    return (
      <div className="frnds">
        <div className="inbox-lists inbox-list-construction">
          <div className="inbox-action">
            <ul>
              <li>
                <label>Loại khuyến mãi</label>
                <select onChange={this.onChangeType} value={this.state.type} class="form-control">
                  <option value={0}>Tất cả</option>
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
              <li>
                <label>Tìm kiếm</label>
                <div className="search-field">
                  <div className="search-field__input">
                    <input onChange={this.onChangePhone} value={this.state.phone} className="js-term search-field__input-field" type="search" placeholder="Phone" />
                  </div>
                </div>
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
                            {item.user && <li>{item.user.name}</li>}
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
            <div className="paging-container">
              {constructions && <Pagination defaultCurrent={1} current={this.state.page + 1} onChange={this.onChangePage} total={constructions.totalPage * constructions.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListConstruction
