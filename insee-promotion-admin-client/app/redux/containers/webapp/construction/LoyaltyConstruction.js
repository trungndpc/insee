import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import RejectConstructionModal from '../../../../components/modal/RejectConstructionModal'
import * as ConstructionStatus from '../../../../components/enum/StatusConstruction'
import ReactSelect from '../../../../components/layout/ReactSelect'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import ClientNote from '../../../../components/enum/ClientNote'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import * as CementEnum from '../../../../components/enum/CementEnum'
import { City, District } from '../../../../data/Location'
import CommonUtil from '../../../../utils/CommonUtil';
import ConstructionModel from '../../../../model/ConstructionModel';
import AlertUtils from '../../../../utils/AlertUtils'
import SubmitConstructionModel from '../../../../model/SubmitConstructionModel'
import { SubmitConstructionStatus, WAITING } from '../../../../components/enum/SubmitConstructionStatus';
import SimpleImgViewer from '../../../../components/layout/SimpleImgViewer';
import VerifiedConstructionModal from '../../../../components/modal/VerifiedConstructionModal';
import ApprovedSubmitConstructionModal from '../../../../components/modal/ApprovedSubmitConstructionModal';
import RejectedSubmitConstructionModal from '../../../../components/modal/RejectedSubmitConstructionModal';

class LoyaltyConstruction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isCanApproval: true,
      errorMsg: null,
      isAreYouSureModal: false,
      construction: this.props.construction,
      submits: null
    }
    this._onChangeInput = this._onChangeInput.bind(this)
    this._approval = this._approval.bind(this)
    this.updateConstruction = this.updateConstruction.bind(this)
    this.load = this.load.bind(this)
    this.imgViewerRef = {};
    this.billViewerRef = {};
  }

  _approval(is_approved) {
    is_approved ? (this.setState({ isOpenApprovalModal: true })) : (this.setState({ isOpenRejectModal: true }));
  }

  _onClickOpenFormSendingGift() {
    this.setState({ isSendingGift: true })
  }

  componentDidMount() {
    this.props.appActions.getListLabel()
    this.getSubmits(this.props.construction.id)
  }


  load() {
    this.getSubmits(this.props.construction.id)
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

  getSubmits(constructionId) {
    SubmitConstructionModel.list(constructionId)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ submits: resp.data })
        }
      })
  }


  render() {
    const construction = this.state.construction
    const labels = this.props.app.labels;
    const labelOptions = labels && labels.map(e => { return { value: e.id, label: e.name } })
    const status = construction && ConstructionStatus.findByStatus(construction.status);
    const is_editing = status == ConstructionStatus.WAITING_APPROVAL
    const submits = this.state.submits;
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
                      <td>{construction && <input onChange={(e) => this._onChangeInput('name', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={construction.name} />}</td>
                    </tr>
                    <tr>
                      <th>SDT cửa hàng: </th>
                      <td>{construction && <input onChange={(e) => this._onChangeInput('phone', e.target.value)} disabled={is_editing ? '' : 'disabled'} className="input-c" value={construction.phone} />}</td>
                    </tr>
                    <tr>
                      <th>Loại xi măng</th>
                      <td>{construction && CementEnum.findById(construction.cement) && CementEnum.findById(construction.cement).name}</td>
                    </tr>
                    {this.state.construction && this.state.construction.quantity > 0 &&
                      <tr>
                        <th>Số lượng: </th>
                        <td>{construction && <input onChange={(e) => this._onChangeInput('quantity', e.target.value)} disabled type="number" className="input-c" value={this.state.construction.quantity} />}</td>
                      </tr>
                    }
                    <tr>
                      <th>Trạng thái</th>
                      <td>{status && status.getName()}</td>
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
                    <tr>
                      <th>Label</th>
                      <td className="label">
                        {construction.label && (`#${construction.label.name}`)}
                        {!construction.label &&
                          <ReactSelect className="label-select-c" placeholder="Gắn nhãn công trình giúp hệ thống phục vụ bản tốt hơn" options={labelOptions} ref={e => this.labelRef = e} />
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>

          {this.state.errorMsg && <div className="errorMsg-right">{this.state.errorMsg}</div>}
          <div className="action-container">
            <ul className="action-customer-detail">
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <li><Link onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Cập nhật</Link></li>
              }
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <div>
                  <li><Link onClick={() => this._approval(true)} style={{ backgroundColor: '#2196F3' }} className="add-butn">Xác nhận</Link></li>
                  <li><Link onClick={() => this._approval(false)} style={{ backgroundColor: '#9E9E9E' }} className="add-butn">Không xác nhận</Link></li>
                </div>
              }
            </ul>
          </div>

          <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">Hóa đơn</h5>
              </div>
              <div className="col-lg-12 col-sm-12 pading0">
                <table className="table">
                  <thead className=" insee-color">
                    <tr className="insee-color">
                      <th scope="col">STT</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Hóa đơn</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submits && submits.map((item, index) => {
                      let subStatus = SubmitConstructionStatus.findByValue(item.status)
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{DateTimeUtil.diffTime(item.createdTime)}</td>
                          <td>{item.bags}</td>
                          <td>
                            {item.images.map((image, i) => {
                              return (
                                <SimpleImgViewer className="submit-img">
                                  {image}
                                </SimpleImgViewer>
                              )
                            })}
                          </td>
                          <td>{subStatus.getName()}</td>
                          <td>
                            {(status == ConstructionStatus.NEED_APPROVAL_AGAIN || status == ConstructionStatus.APPROVED) && subStatus == WAITING && <Link onClick={() => { this.approvedSubmitModalRef.open(item.id) }} ><i style={{ color: '#2196F3' }} className="btn-check fas fa-check"></i></Link>}
                            {(status == ConstructionStatus.NEED_APPROVAL_AGAIN || status == ConstructionStatus.APPROVED) && subStatus == WAITING && <Link onClick={() => { this.rejectedSubmitModalRef.open(item.id) }}><i style={{ color: '#9E9E9E' }} className="btn-reject fas fa-eject"></i></Link>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {construction &&
            <ApprovedSubmitConstructionModal callback={this.load} constructionId={construction.id} ref={(e) => this.approvedSubmitModalRef = e} />
          }

          {construction &&
            <RejectedSubmitConstructionModal callback={this.load} constructionId={construction.id} ref={(e) => this.rejectedSubmitModalRef = e} />
          }

          {construction &&
            <VerifiedConstructionModal {...this.props}
              id={construction.id}
              isOpen={this.state.isOpenApprovalModal}
              onClose={() => {
                this.setState({ isOpenApprovalModal: false });
                this.load();
              }} />
          }
          {construction &&
            <RejectConstructionModal {...this.props}
              id={construction.id}
              isOpen={this.state.isOpenRejectModal}
              onClose={() => {
                this.setState({ isOpenRejectModal: false });
                this.load();
              }} />
          }
          <AreYouSureModal isOpen={this.state.isAreYouSureModal}
            onOK={this.updateConstruction}
            onClose={() => this.setState({ isAreYouSureModal: false })} />
        </div>
      </div>
    )
  }
}

export default LoyaltyConstruction
