import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import GiftModel from '../../../../model/GiftModel';
import AlertUtils from '../../../../utils/AlertUtils'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import DateTimeUtil from '../../../../utils/DateTimeUtil';
import PointModel from '../../../../model/PointModel';
import { INIT, APPROVED, RedeemPointStatus } from '../../../../components/enum/RedeemPointStatus';
import { TypeGiftRedeemPoint, CARD_PHONE } from '../../../../components/enum/TypeGiftRedeemPoint';
import PhoneCardGiftRedeemPointModal from './gift/PhoneCardGiftRedeemPointModal';
import VoucherGiftRedeemPointModal from './gift/VoucherGiftRedeemPointModal';

class RedeemPointDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redeemPoint: null,
      isAreYouSureModal: false,
      isSendGiftModal: false,
      id: this.props.id
    }
    this.load = this.load.bind(this)
    this.approval = this.approval.bind(this)
    this.received = this.received.bind(this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    PointModel.get(this.props.id)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ redeemPoint: resp.data })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  approval() {
    PointModel.updateStatus(this.state.id, APPROVED.getStatus())
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
    const redeemPoint = this.state.redeemPoint;
    const customer = redeemPoint && redeemPoint.customer;
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                {redeemPoint && <h5 className="f-title">{redeemPoint && TypeGiftRedeemPoint.findById(redeemPoint.typeGiftId).getName()}</h5>}
              </div>
              <table className="table table-responsive table-info-contractor">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{redeemPoint && redeemPoint.id}</td>
                  </tr>
                  <tr>
                    <th>Quà cần đổi</th>
                    <td style={{ fontSize: '17px', fontWeight: '600' }}>{redeemPoint && TypeGiftRedeemPoint.findById(redeemPoint.typeGiftId).getName()}</td>
                  </tr>
                  <tr>
                    <th>Số điểm đổi</th>
                    <td style={{ fontSize: '17px', fontWeight: '600' }}>{redeemPoint && redeemPoint.amount} điểm</td>
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
                    <th>Trang thái</th>
                    {redeemPoint &&
                      <td style={{ color: RedeemPointStatus.getColor(redeemPoint.status) }}>{redeemPoint && RedeemPointStatus.findByStatus(redeemPoint.status).getName()}</td>
                    }
                  </tr>
                  <tr>
                    <th>Thời gian tạo</th>
                    <td>{redeemPoint && DateTimeUtil.diffTime(redeemPoint.createdTime)}</td>
                  </tr>
                  <tr>
                    <th>Thời gian cập nhật</th>
                    <td>{redeemPoint && DateTimeUtil.diffTime(redeemPoint.updatedTime)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="action-container">
            <ul className="action-customer-detail">
              {redeemPoint && redeemPoint.status == INIT.getStatus() &&
                <li><Link onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Xác nhận</Link></li>
              }
              {redeemPoint && redeemPoint.status == APPROVED.getStatus() &&
                <li><Link onClick={() => { this.setState({ isSendGiftModal: true }) }} className="add-butn">Gửi quà</Link></li>
              }
            </ul>
          </div>
          <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={this.approval}
            onClose={() => { this.setState({ isAreYouSureModal: false }) }} />
          {redeemPoint && redeemPoint.typeGiftId === CARD_PHONE.getType() && this.state.isSendGiftModal && <PhoneCardGiftRedeemPointModal isOpen={true}
            pointId={redeemPoint.id}
            maxValue={redeemPoint.amount}
            customerId={redeemPoint.customer.id}
            callback={() => {
              this.load()
            }} />}
          {redeemPoint && redeemPoint.typeGiftId !== CARD_PHONE.getType() && this.state.isSendGiftModal && <VoucherGiftRedeemPointModal
            isOpen={true}
            pointId={redeemPoint.id}
            typeGiftId={redeemPoint.typeGiftId}
            customerId={redeemPoint.customer.id}
            callback={() => {
              this.load()
            }}
          />}
        </div>
      </div>
    )
  }
}

export default RedeemPointDetail
