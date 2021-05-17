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
import SendGiftModal from '../../../../components/modal/SendGiftModal'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import ClientNote from '../../../../components/enum/ClientNote'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import * as CementEnum from '../../../../components/enum/CementEnum'
import { City, District } from '../../../../data/Location'
import CommonUtil from '../../../../utils/CommonUtil';
import ConstructionModel from '../../../../model/ConstructionModel';
import AlertUtils from '../../../../utils/AlertUtils'

class NowConstruction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isCanApproval: true,
      errorMsg: null,
      isAreYouSureModal: false,
      isSendingGift: false,
      construction: this.props.construction
    }
    this._onChangeInput = this._onChangeInput.bind(this)
    this._approval = this._approval.bind(this)
    this.updateConstruction = this.updateConstruction.bind(this)
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

  _onClickOpenFormSendingGift() {
    this.setState({ isSendingGift: true })
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
    arr = images.filter(e => e.status == ImageStatus.WAITING_APPROVAL.getStatus());
    if (arr && arr.length > 0) {
      return false;
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
                      <th>Địa chỉ</th>
                      <td >{construction && <input onChange={(e) => this._onChangeInput('address', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={this.state.construction.address} />}</td>
                    </tr>
                    <tr>
                      <th>Tỉnh / Huyện </th>
                      <td>
                        <select onChange={(e) => this._onChangeInput('city', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="select-c" value={this.state.construction.city}>
                          <option value={0}>None</option>
                          {City.getList().map((item) => (
                            <option value={item.key} key={item.key}>{item.value}</option>
                          ))}
                        </select>
                        <span style={{ padding: '0px 10px' }}> / </span>
                        <select onChange={(e) => this._onChangeInput('district', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="select-c" value={this.state.construction.district}>
                          <option value={0}>None</option>
                          {District.getList(this.state.construction.city).map((item) => (
                            <option value={item.key} key={item.key}>{item.value}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <th>Nhà thầu</th>
                      <td style={{ color: '#b71c1c' }}>{construction && <Link to={'/customer/' + construction.user.customerId}>{construction.user.name}</Link>}</td>
                    </tr>
                    <tr>
                      <th>Tên cửa hàng: </th>
                      <td>{construction && <input onChange={(e) => this._onChangeInput('name', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={this.state.construction.name} />}</td>
                    </tr>
                    <tr>
                      <th>SDT cửa hàng: </th>
                      <td>{construction && <input onChange={(e) => this._onChangeInput('phone', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={this.state.construction.phone} />}</td>
                    </tr>
                    <tr>
                      <th>Loại xi măng</th>
                      <td>{construction && CementEnum.findById(construction.cement) && CementEnum.findById(construction.cement).name}</td>
                    </tr>
                    <tr>
                      <th>Số lượng sản phẩm: </th>
                      <td>{construction && <input onChange={(e) => this._onChangeInput('quantity', e.target.value)} disabled={is_editing ? '' : 'disabled'} type="number" className="input-c" value={this.state.construction.quantity} />}</td>
                    </tr>
                    <tr>
                      <th>Trạng thái</th>
                      <td>{status && status.getName()}</td>
                    </tr>
                    <tr>
                      <th>Đã duyệt</th>
                      <td>{construction && construction.bills && this.countApproved(construction.bills)} hóa đơn,  {construction && construction.images && this.countApproved(construction.images)} hình ảnh</td>
                    </tr>
                    <tr>
                      <th>Label</th>
                      <td className="label">
                        {construction.label && (`#${construction.label.name}`)}
                        {!construction.label &&
                          <ReactSelect className="label-select-c" placeholder="Gắn nhãn công trình giúp hệ thống phục vụ bản tốt hơn" options={labelOptions} ref={e => this.labelRef = e} />
                        }
                      </td>
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
            <ui className="action-customer-detail">
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <li><Link onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Cập nhật</Link></li>
              }
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <div>
                  <li><Link onClick={() => this._approval(true)} style={{ backgroundColor: '#2196F3' }} className="add-butn">Chấp nhận</Link></li>
                  <li><Link onClick={() => this._approval(false)} style={{ backgroundColor: '#9E9E9E' }} className="add-butn">Không chấp nhận</Link></li>
                </div>
              }
              {status == ConstructionStatus.APPROVED &&
                <li><Link onClick={() => this.setState({isSendingGift: true})} className="add-butn">Gửi quà</Link></li>
              }
            </ui>
          </div>

          <div className="central-meta">
            <h5 className="f-title bill">HÓA ĐƠN ({construction && construction.bills && construction.bills.length})</h5>
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
            <h5 className="f-title bill">HÌNH ẢNH CÓ XI MĂNG INSEE ({construction && construction.images && construction.images.length})</h5>
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
            <SendGiftModal {...this.props} constructionId={construction.id}
              customerId={construction.user.customerId}
              isOpen={this.state.isSendingGift}
              onClose={() => { this.setState({ isSendingGift: false }) }} />
          }
          <AreYouSureModal isOpen={this.state.isAreYouSureModal}
            onOK={this.updateConstruction}
            onClose={() => this.setState({ isAreYouSureModal: false })} />
        </div>
      </div>
    )
  }
}

export default NowConstruction
