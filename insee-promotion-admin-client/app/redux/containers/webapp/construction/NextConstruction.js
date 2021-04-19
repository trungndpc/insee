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
      isEditing: true,
      construction: this.props.construction
    }
    this.updateConstruction = this.updateConstruction.bind(this)
    this._onClickOpenFormSendingGift = this._onClickOpenFormSendingGift.bind(this)
    this._onCloseFormSendingGift = this._onCloseFormSendingGift.bind(this)
    this._onChangeInput = this._onChangeInput.bind(this)
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
    const construction = this.props.app.construction;
    let data = {
      id: construction.id
    }
    let lable = this.labelRef.getValue();
    if (lable.__isNew__) {
      data.labelName = lable.value,
        data.labelType = 1
    } else {
      data.labelId = lable.value
    }
    this.setState({ isAreYouSureModal: false })
    this.props.appActions.updateConstruction(data);
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
              {construction && !construction.label &&
                <li><Link onClick={this._onClickOpenAreYouSureModal} className="add-butn">Cập nhật</Link></li>
              }
              {construction
                && construction.label &&
                (construction.status == ConstructionStatus.WAITING_APPROVAL.getStatus()
                  || construction.status == ConstructionStatus.RE_SUBMIT.getStatus()) &&
                <div>
                  <li><Link onClick={this._onClickOpenApprovalModal} className="add-butn">Chấp nhận</Link></li>
                  <li><Link onClick={this._onClickOpenRejectModal} className="add-butn">Không chấp nhận</Link></li>
                </div>
              }
              {construction && construction.status == ConstructionStatus.APPROVED.getStatus() &&
                <li><Link onClick={this._onClickOpenFormSendingGift} className="add-butn">Gửi quà</Link></li>
              }
            </ui>
          </div>

          {construction &&
            <ApprovalConstructionModal {...this.props} id={construction.id} isOpen={this.state.isOpenApprovalModal} onClose={this._onCloseApprovalModal} />
          }
          {construction &&
            <RejectConstructionModal {...this.props} id={construction.id} isOpen={this.state.isOpenRejectModal} onClose={this._onCloseRejectModal} />
          }
          {construction &&
            <SendGiftModal {...this.props} constructionId={construction.id} customerId={construction.user.customerId} isOpen={this.state.isSendingGift} onClose={this._onCloseFormSendingGift} />
          }
          <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={this.updateConstruction} onClose={this._onCloseAreUSureModal} />
        </div>
      </div>
    )
  }
}

export default ConstructionDetail
