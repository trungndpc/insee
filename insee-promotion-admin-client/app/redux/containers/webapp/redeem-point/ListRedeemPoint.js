import React, { Component } from 'react'
import { INIT, APPROVED, SENT_GIFT, RedeemPointStatus } from '../../../../components/enum/RedeemPointStatus'
import { TypeGiftRedeemPoint } from '../../../../components/enum/TypeGiftRedeemPoint'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';
import {
  Link,
} from "react-router-dom";
import PointModel from '../../../../model/PointModel';

class ListRedeemPoint extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      status: -1,
      type: -1,
      page_redeem_point: null
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
    PointModel.getList(type, status, page - 1, pageSize)
      .then(resp => {
        this.setState({ page_redeem_point: resp.data })
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
    const page_redeem_point = this.state.page_redeem_point;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li>
                <label>Loại quà:</label>
                <select onChange={this._onChangeType} className="form-control">
                  <option value={-1}>Tất cả</option>
                  {TypeGiftRedeemPoint.getList().map((gift, index) => {
                    return (
                      <option key={index} value={gift.getType()}>{gift.getName()}</option>
                    )
                  })}
                </select>
              </li>
              <li>
                <label>Trạng thái:</label>
                <select onChange={this._onChangeStatus} value={this.state.status} className="form-control">
                  <option value={-1}>Tất cả</option>
                  <option value={INIT.getStatus()}>{INIT.getName()}</option>
                  <option value={APPROVED.getStatus()}>{APPROVED.getName()}</option>
                  <option value={SENT_GIFT.getStatus()}>{SENT_GIFT.getName()}</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {page_redeem_point && page_redeem_point.list && page_redeem_point.list.map(function (item, key) {
                return (
                  <li key={key}>
                    <div className="nearly-pepls">
                      <div className="pepl-info row">
                        <div className="col-md-9">
                          <h5>{`${TypeGiftRedeemPoint.findById(item.typeGiftId).getName()} - ${item.amount} điểm `}</h5>
                          <ul>
                            <li>{item.customer.fullName}</li>
                            <li>{item.customer.phone}</li>
                            <li><span style={{ backgroundColor: RedeemPointStatus.getColor(item.status) }} className="spstatus">{RedeemPointStatus.findByStatus(item.status).getName()}</span></li>
                            <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                          </ul>
                        </div>
                        <div className="col-md-3 action">
                          <Link to={`/redeem-point/${item.id}`} className="add-butn">Chi tiết</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
              {page_redeem_point && page_redeem_point.list && page_redeem_point.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có gì ở đây</div>}

            </ul>
            <div className="paging-container">
              {page_redeem_point && <Pagination defaultCurrent={1} current={this.state.page} onChange={this._onChangePage} total={page_redeem_point.totalPage * page_redeem_point.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListRedeemPoint
