import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import ApprovalConstructionModal from '../../../../components/modal/ApprovalConstructionModal'
import RejectConstructionModal from '../../../../components/modal/RejectConstructionModal'
import ImgViewer from '../../../../components/layout/ImgViewer'
import * as ImageStatus from '../../../../components/enum/ImageStatus'
import * as ConstructionStatus from '../../../../components/enum/StatusConstruction'
import ReactSelect from '../../../../components/layout/ReactSelect'
import GiftModal from '../../../../components/modal/gift/GiftModal'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import ClientNote from '../../../../components/enum/ClientNote'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import * as CementEnum from '../../../../components/enum/CementEnum'
import { City, District } from '../../../../data/Location'
import CommonUtil from '../../../../utils/CommonUtil';
import ConstructionModel from '../../../../model/ConstructionModel';
import AlertUtils from '../../../../utils/AlertUtils'
import { COLLECT_POINT } from '../../../../components/enum/TypeConstruction';

class DetailGreetingFriendConstruction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isCanApproval: true,
      errorMsg: null,
      isAreYouSureModal: false,
      construction: this.props.construction
    }
    this._onChangeInput = this._onChangeInput.bind(this)
    this._approval = this._approval.bind(this)
    this.updateConstruction = this.updateConstruction.bind(this)
    this.getConstruction = this.getConstruction.bind(this)
    this.imgViewerRef = {};
    this.billViewerRef = {};
  }

  _approval(is_approved) {
    let construction = this.props.construction;
    if (!this.isCanApproval(construction.bills, construction.images)) {
      this.setState({ errorMsg: 'Vui lòng duyệt hết hóa đơn và hình ảnh nhà thầu upload lên.' });
      return;
    }
    is_approved ? (this.setState({ isOpenApprovalModal: true })) : (this.setState({ isOpenRejectModal: true }));
  }

  componentDidMount() {
    this.props.appActions.getListLabel()
  }


  countApproved(bills) {
    let arr = bills.filter(e => e.status == ImageStatus.APPROVED.getStatus());
    return arr ? arr.length : 0
  }

  isCanApproval(bills, images) {
    let arr = bills.filter(e => e.status == ImageStatus.WAITING_APPROVAL.getStatus());
    if (arr && arr.length > 0) {
      return false;
    }
    if (images) {
      arr = images.filter(e => e.status == ImageStatus.WAITING_APPROVAL.getStatus());
      if (arr && arr.length > 0) {
        return false;
      }
    }

    return true;
  }

  updateConstruction() {
    const construction = this.state.construction
    let data = {
      id: construction.id,
      city: (construction.city && construction.city != 0) ? construction.city : undefined,
      district: (construction.district && construction.district != 0) ? construction.district : undefined,
      name: construction.name,
      phone: construction.phone,
      address: construction.address,
      cement: construction.cement,
      quantity: construction.quantity
    }

    if (this.labelRef) {
      let value = this.labelRef.getValue();
      value && (value.__isNew__ ? (data.labelName = value.value) : (data.labelId = value.value));
    }

    ConstructionModel.update(data)
      .then(resp => {
        AlertUtils.showSuccess('Updated')
        this.props.appActions.getConstruction(this.state.construction.id)
      })
    this.setState({ isAreYouSureModal: false })
  }


  _onChangeInput(name, value) {
    let construction = { ...this.state.construction }
    construction[name] = value
    this.setState({ construction: construction })
  }

  getConstruction(constructionId) {
    this.props.appActions.getConstruction(constructionId)
  }


  render() {
    const construction = this.state.construction
    const labels = this.props.app.labels;
    const labelOptions = labels && labels.map(e => { return { value: e.id, label: e.name } })
    const status = construction && ConstructionStatus.findByStatus(construction.status);
    const is_editing = status == ConstructionStatus.WAITING_APPROVAL
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about construction">
              <div className="personal">
                <h5 className="f-title">THÔNG TIN CÔNG TRÌNH</h5>
              </div>
              {construction &&
                <table className="table table-responsive table-info-contractor">
                  <tbody>
                    <tr>
                      <th>Nhà thầu</th>
                      <td style={{ color: '#b71c1c' }}>{construction && <Link to={'/customer/' + construction.user.customerId}>{construction.user.name}</Link>}</td>
                    </tr>
                    <tr>
                      <th>SDT cửa hàng: </th>
                      <td>{construction && <input onChange={(e) => this._onChangeInput('phone', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={this.state.construction.user.phone} />}</td>
                    </tr>
                    <tr>
                      <th>Loại xi măng</th>
                      <td>{construction && CementEnum.findById(construction.cement) && CementEnum.findById(construction.cement).name}</td>
                    </tr>
                    {this.state.construction && this.state.construction.quantity > 0 &&
                      <tr>
                        <th>Số lượng: </th>
                        <td>{construction && <input onChange={(e) => this._onChangeInput('quantity', e.target.value)} disabled={is_editing ? '' : 'disabled'} type="number" className="input-c" value={this.state.construction.quantity} />}</td>
                      </tr>
                    }
                    <tr>
                      <th>Trạng thái</th>
                      <td>{status && status.getName()}</td>
                    </tr>
                    <tr>
                      <th>Đã duyệt</th>
                      <td>{construction && construction.bills && this.countApproved(construction.bills)} hóa đơn,  {construction && construction.images && this.countApproved(construction.images)} hình ảnh</td>
                    </tr>
                    {construction && construction.createdTime &&
                      <tr>
                        <th>Thời gian tạo</th>
                        <td>{DateTimeUtil.diffTime(construction.createdTime)}</td>
                      </tr>
                    }
                    {construction && construction.valueBill &&
                      <tr>
                        <th>Giá trị hóa đơn</th>
                        <td>{CommonUtil.formatMoney(construction.valueBill)}</td>
                      </tr>
                    }
                    {(construction && construction.extra) &&
                      <tr>
                        <th>Lưu ý</th>
                        <td>*** {construction.extra.agree && ClientNote[construction.extra.agree]}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              }
            </div>
          </div>

          {this.state.errorMsg && <div className="errorMsg-right">{this.state.errorMsg}</div>}
          <div className="action-container">
            <ul className="action-customer-detail">
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <li><a onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Cập nhật</a></li>
              }
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <div>
                  <li><a onClick={() => this._approval(true)} style={{ backgroundColor: '#2196F3' }} className="add-butn">Chấp nhận</a></li>
                  <li><a onClick={() => this._approval(false)} style={{ backgroundColor: '#9E9E9E' }} className="add-butn">Không chấp nhận</a></li>
                </div>
              }
              {status == ConstructionStatus.APPROVED && construction.type != COLLECT_POINT.getType() &&
                <li><a onClick={() => { this.giftModalRef.open() }} className="add-butn">Gửi quà</a></li>
              }
            </ul>
          </div>

          <div className="central-meta">
            <h5 className="f-title bill">HÌNH ẢNH({construction && construction.bills && construction.bills.length})</h5>
            <ul className="photos">
              {construction && construction.bills && construction.bills.map((item, index) => {
                return (
                  <li key={item.id}>
                    <a className="strip" href="#">
                      <img onClick={() => { this.billViewerRef[item.id].open(item, 1) }} src={item.link} alt="" />
                      {item.status == ImageStatus.REJECTED.getStatus() && <div style={{ color: ImageStatus.ImageStatus.getColor(item.status) }} className="status">Reject</div>}
                    </a>
                    <ImgViewer ref={(e) => { this.billViewerRef[item.id] = e }} constructionId={construction.id} {...this.props} />
                  </li>
                )
              })
              }

            </ul>
            <ul className="photos">
              {construction && construction.images && construction.images.map((item, index) => {
                return (
                  <li key={item.id}>
                    <a className="strip" href="#">
                      <img onClick={() => { this.imgViewerRef[item.id].open(item, 2) }} src={item.link} alt="" />
                      {item.status == ImageStatus.REJECTED.getStatus() && <div style={{ color: ImageStatus.ImageStatus.getColor(item.status) }} className="status">Reject</div>}
                    </a>
                    <ImgViewer ref={(e) => { this.imgViewerRef[item.id] = e }} constructionId={construction.id} {...this.props} />
                  </li>
                )
              })
              }
            </ul>
          </div>
          {construction &&
            <ApprovalConstructionModal {...this.props}
              id={construction.id}
              isOpen={this.state.isOpenApprovalModal}
              onClose={() => this.setState({ isOpenApprovalModal: false })} />
          }
          {construction &&
            <RejectConstructionModal {...this.props}
              id={construction.id}
              isOpen={this.state.isOpenRejectModal}
              onClose={() => { this.setState({ isOpenRejectModal: false }) }} />
          }
          {construction &&
            <GiftModal
              ref={e => this.giftModalRef = e}
              promotionId={construction.promotionId}
              constructionId={construction.id}
              customerId={construction.user.customerId}
              callback={() => { this.getConstruction(construction.id) }}
            />
          }
          <AreYouSureModal isOpen={this.state.isAreYouSureModal}
            onOK={this.updateConstruction}
            onClose={() => this.setState({ isAreYouSureModal: false })} />
        </div>
      </div>
    )
  }
}

export default DetailGreetingFriendConstruction
