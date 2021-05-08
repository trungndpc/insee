import React, { Component } from 'react'
import { GiftStatus, WAITING_RECEIVE, RECEIVED, ROLLED } from '../../../../components/enum/GiftStatus'
import GiftModel from '../../../../model/GiftModel';
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';
import {
  Link,
} from "react-router-dom";

class ListGirt extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      status: -1,
      type: -1,
      page_gifts: null
    }
    this.getList = this.getList.bind(this)
    this._onChangeStatus = this._onChangeStatus.bind(this)
    this._onChangeType = this._onChangeType.bind(this)
    this._onChangePage = this._onChangePage.bind(this)
  }

  componentDidMount() {
    this.getList(this.state.type, this.state.status, this.state.page, this.state.pageSize)
  }

  getList(type, status, page, pageSize) {
    GiftModel.getList(type, status, page - 1, pageSize)
      .then(resp => {
        this.setState({ page_gifts: resp.data })
      })
  }

  _onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status })
    this.getList(this.state.type, status, this.state.page, this.state.pageSize)
  }

  _onChangeType(event) {
    let type = event.target.value;
    this.setState({ type: type })
    this.getList(type, this.state.status, this.state.page, this.state.pageSize)
  }

  _onChangePage(pageNumber, pageSize) {
    this.getList(this.state.type, this.state.status, pageNumber, this.state.pageSize)
    this.setState({ page: pageNumber })
  }


  render() {
    const page_gifts = this.state.page_gifts;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              {/* <li>
                <label>Khuyến mãi:</label>
                <select className="form-control">
                  <option >Tất cả</option>
                  <option >Keo dán tường </option>
                  <option >Xi măng</option>
                </select>
              </li> */}
              <li>
                <label>Loại quà:</label>
                <select onChange={this._onChangeType} className="form-control">
                  <option value={-1}>Tất cả</option>
                  <option value={1}>Thẻ điện thoại</option>
                  <option value={2}>Vòng quay may mắn</option>
                </select>
              </li>
              <li>
                <label>Trạng thái:</label>
                <select onChange={this._onChangeStatus} value={this.state.status} className="form-control">
                  <option value={-1}>Tất cả</option>
                  <option value={WAITING_RECEIVE.getStatus()}>Chờ nhận</option>
                  <option value={ROLLED.getStatus()}>Đã Quay</option>
                  <option value={RECEIVED.getStatus()}>Đã Nhận</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {page_gifts && page_gifts.list && page_gifts.list.map(function (item, key) {
                return (
                  <li key={key}>
                    <div className="nearly-pepls">
                      <div className="pepl-info row">
                        <div className="col-md-9">
                          <h5>{`#${item.id}  ${item.name}`}</h5>
                          <ul>
                            <li>{item.customer.fullName}</li>
                            <li>{item.customer.phone}</li>
                            <li><span style={{ backgroundColor: GiftStatus.getColor(item.status) }} className="spstatus">{GiftStatus.getName(item.status)}</span></li>
                            <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                          </ul>
                        </div>
                        <div className="col-md-3 action">
                          <Link to={`/construction/${item.construction.id}`} className="add-butn" data-ripple>Chi tiết</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
              {page_gifts && page_gifts.list && page_gifts.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có quà tặng nào ở đây</div>}

            </ul>
            <div className="paging-container">
              {page_gifts && <Pagination defaultCurrent={1} current={this.state.page} onChange={this._onChangePage} total={page_gifts.totalPage * page_gifts.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListGirt
