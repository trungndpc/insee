import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import GiftModel from '../../../../model/GiftModel';
import AlertUtils from '../../../../utils/AlertUtils'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import { GiftStatus, WAITING_SENT, WAITING_RECEIVE, RECEIVED } from '../../../../components/enum/GiftStatus'
import DateTimeUtil from '../../../../utils/DateTimeUtil';

class GiftDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gift: null,
      isAreYouSureModal: false,
      isConfirmReceivedModal: false,
      id: this.props.giftId
    }
    this.load = this.load.bind(this)
    this.send = this.send.bind(this)
    this.received = this.received.bind(this)
  }

  componentDidMount() {
    this.load(this.state.id)
  }

  load(id) {
    GiftModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ gift: resp.data })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  send(id) {
    GiftModel.updateStatus(this.state.id, WAITING_RECEIVE.getStatus())
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess("Thành công");
          this.load(this.state.id)
        }
      })
  }

  received(id) {
    GiftModel.updateStatus(this.state.id, RECEIVED.getStatus())
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess("Thành công");
          this.load(this.state.id)
        }
      })
  }

  render() {
    const gift = this.state.gift;
    const customer = gift && gift.customer;
    const construction = gift && gift.construction;
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                {gift && <h5 className="f-title">{gift.name}</h5>}
              </div>
              <table className="table table-responsive table-info-contractor">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td style={{ fontSize: '17px', fontWeight: '600' }}>{gift && gift.id}</td>
                  </tr>
                  <tr>
                    <th>Thầu</th>
                    {customer && <td><Link to={`/customer/${customer.id}`}>{customer.fullName}</Link></td>}
                  </tr>
                  <tr>
                    <th>Số điện thoại</th>
                    <td>{customer && customer.phone}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ công trình</th>
                    <td>{construction && <Link to={`/construction/${construction.id}`}>{construction.address}</Link>}</td>
                  </tr>
                  <tr>
                    <th>Trang thái</th>
                    {gift &&
                      <td style={{ color: GiftStatus.getColor(gift.status) }}>{gift && GiftStatus.getName(gift.status)}</td>
                    }
                  </tr>
                  <tr>
                    <th>Thời gian tạo</th>
                    <td>{gift && DateTimeUtil.diffTime(gift.createdTime)}</td>
                  </tr>
                  <tr>
                    <th>Thời gian cập nhật</th>
                    <td>{gift && DateTimeUtil.diffTime(gift.updatedTime)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-container">
            <ul className="action-customer-detail">
              {/* {gift && gift.status == WAITING_SENT.getStatus() &&
                <li><Link onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Xác nhận đã chuyển quà</Link></li>
              } */}
              {/* {gift && gift.status == WAITING_RECEIVE.getStatus() &&
                <li><Link onClick={() => { this.setState({ isConfirmReceivedModal: true }) }} className="add-butn">Xác nhận đã nhận</Link></li>
              } */}
            </ul>
          </div>
          <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={this.send} onClose={() => { this.setState({ isAreYouSureModal: false }) }} />
          <AreYouSureModal isOpen={this.state.isConfirmReceivedModal} onOK={this.received} onClose={() => { this.setState({ isConfirmReceivedModal: false }) }} />
        </div>
      </div>
    )
  }
}

export default GiftDetail
