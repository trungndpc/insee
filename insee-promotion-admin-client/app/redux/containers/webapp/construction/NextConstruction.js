import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import ApprovalConstructionModal from '../../../../components/modal/ApprovalConstructionModal'
import RejectConstructionModal from '../../../../components/modal/RejectConstructionModal'
import * as ConstructionStatus from '../../../../components/enum/StatusConstruction'
import ReactSelect from '../../../../components/layout/ReactSelect'
import SendGiftModal from '../../../../components/modal/SendGiftModal'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import ClientNote from '../../../../components/enum/ClientNote'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import Project from '../../../../data/Project'
import { City, District } from '../../../../data/Location'
import ConstructionModel from '../../../../model/ConstructionModel'
import AlertUtils from '../../../../utils/AlertUtils'

class ConstructionDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isCanApproval: true,
      errorMsg: null,
      isAreYouSureModal: false,
      isSendingGift: false,
      isEditing: false,
      construction: this.props.construction
    }
    this.updateConstruction = this.updateConstruction.bind(this)
    this._onClickOpenFormSendingGift = this._onClickOpenFormSendingGift.bind(this)
    this._onCloseFormSendingGift = this._onCloseFormSendingGift.bind(this)
    this._onChangeInput = this._onChangeInput.bind(this)
    this._approval = this._approval.bind(this)
    this.isApproval = true;
  }

  _onClickOpenFormSendingGift() {
    this.setState({ isSendingGift: true })
  }

  _onCloseFormSendingGift() {
    this.setState({ isSendingGift: false })
  }

  componentDidMount() {
    this.props.appActions.getListLabel()
  }



  updateConstruction() {
    const construction = this.state.construction
    let data = {
      id: construction.id,
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

  _approval(is_approved) {
    is_approved ? (this.setState({ isOpenApprovalModal: true })) : (this.setState({ isOpenRejectModal: true }));
  }


  render() {

    const construction = this.state.construction
    const labels = this.props.app.labels;
    const labelOptions = labels && labels.map(e => { return { value: e.id, label: e.name } })
    const status = construction && ConstructionStatus.findByStatus(construction.status);
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
                      <td>{construction && <input onChange={(e) => this._onChangeInput('address', e.target.value)} disabled={this.state.isEditing ? '' : 'disabled'} className="input-c" value={this.state.construction.address} />}</td>
                    </tr>
                    <tr>
                      <th>Tỉnh / Huyện </th>
                      {(construction && construction.city != 0) && <td>{City.getName(construction.city)} / {District.getName(construction.district)}</td>}
                    </tr>
                    <tr>
                      <th>Tên: </th>
                      <td>{construction && <input disabled={this.state.isEditing ? '' : 'disabled'} className="input-c" value={this.state.construction.name} />}</td>
                    </tr>
                    <tr>
                      <th>SDT: </th>
                      <td>{construction && <input disabled={this.state.isEditing ? '' : 'disabled'} className="input-c" value={this.state.construction.phone} />}</td>
                    </tr>
                    <tr>
                      <th>Nhà thầu</th>
                      <td style={{ color: '#b71c1c' }}>{construction && <Link to={'/customer/' + construction.user.customerId}>{construction.user.name}</Link>}</td>
                    </tr>
                    <tr>
                      <th>Thời gian khởi công: </th>
                      <td>{construction && new Date(construction.estimateTimeStart * 1000).toDateString()}</td>
                    </tr>
                    <tr>
                      <th>Loại công trình: </th>
                      <td>{construction && Project.getName(construction.typeConstruction)}</td>
                    </tr>
                    <tr>
                      <th>Trạng thái</th>
                      <td>{status && status.getName()}</td>
                    </tr>

                    {(construction && construction.label) &&
                      <tr>
                        <th>Label</th>
                        <td className="label">#{construction.label.name}</td>
                      </tr>
                    }
                    {construction && construction.createdTime &&
                      <tr>
                        <th>Thời gian tạo</th>
                        <td>{DateTimeUtil.diffTime(construction.createdTime)}</td>
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
            <ui className="action-customer-detail">
              {status == ConstructionStatus.WAITING_APPROVAL && !construction.label &&
                <li><Link onClick={() => { this.setState({ isAreYouSureModal: true }) }} className="add-butn">Cập nhật</Link></li>
              }
              {status == ConstructionStatus.WAITING_APPROVAL &&
                <div>
                  <li><Link onClick={() => this._approval(true)} style={{ backgroundColor: '#2196F3' }} className="add-butn">Chấp nhận</Link></li>
                  <li><Link onClick={() => this._approval(false)} style={{ backgroundColor: '#9E9E9E' }} className="add-butn">Không chấp nhận</Link></li>
                </div>
              }
              {construction && construction.status == ConstructionStatus.APPROVED.getStatus() &&
                <li><Link onClick={this._onClickOpenFormSendingGift} className="add-butn">Gửi quà</Link></li>
              }
            </ui>
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
            <SendGiftModal {...this.props} 
              constructionId={construction.id}
              promotionId={construction.promotionId}
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

export default ConstructionDetail
