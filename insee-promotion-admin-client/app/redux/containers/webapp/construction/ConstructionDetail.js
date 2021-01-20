import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import ApprovalConstructionModal from '../../../../components/modal/ApprovalConstructionModal'
import RejectConstructionModal from '../../../../components/modal/RejectConstructionModal'
import { TypeConstruction, NEXT_CONSTRUCTION, NOW_CONSTRUCTION } from '../../../../components/enum/TypeConstruction'
import ImgViewer from '../../../../components/layout/ImgViewer'
import * as ImageStatus from '../../../../components/enum/ImageStatus'
import * as ConstructionStatus from '../../../../components/enum/StatusConstruction'
import ReactSelect from '../../../../components/layout/ReactSelect'
import SendGiftModal from '../../../../components/modal/SendGiftModal'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import ClientNote from '../../../../components/enum/ClientNote'
import DateTimeUtil from '../../../../utils/DateTimeUtil'

class ConstructionDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isCanApproval: true,
      errorMsg: null,
      isAreYouSureModal: false,
      isSendingGift: false
    }
    this._onClickOpenApprovalModal = this._onClickOpenApprovalModal.bind(this)
    this._onCloseApprovalModal = this._onCloseApprovalModal.bind(this)
    this._onClickOpenRejectModal = this._onClickOpenRejectModal.bind(this)
    this._onCloseRejectModal = this._onCloseRejectModal.bind(this)
    this.updateStatusImg = this.updateStatusImg.bind(this)
    this.updateConstruction = this.updateConstruction.bind(this)
    this._onCloseAreUSureModal = this._onCloseAreUSureModal.bind(this)
    this._onClickOpenAreYouSureModal = this._onClickOpenAreYouSureModal.bind(this)
    this._onClickOpenFormSendingGift = this._onClickOpenFormSendingGift.bind(this)
    this._onCloseFormSendingGift = this._onCloseFormSendingGift.bind(this)
    this.isApproval = true;
  }

  _onClickOpenApprovalModal() {
    if (!this.isApproval) {
      this.setState({ errorMsg: 'Vui lòng duyệt hết hóa đơn và hình ảnh nhà thầu upload lên.' });
      return false;
    }
    this.setState({ isOpenApprovalModal: true })
  }

  _onClickOpenRejectModal() {
    if (!this.isApproval) {
      this.setState({ errorMsg: 'Vui lòng duyệt hết hóa đơn và hình ảnh nhà thầu upload lên.' });
      return false;
    }
    this.setState({ isOpenRejectModal: true })
  }

  _onClickOpenAreYouSureModal() {
    let lable = this.labelRef.getValue();
    if (!lable) {
      this.setState({ errorMsg: 'Vui lòng chọn Label' })
      return;
    }
    this.setState({ isAreYouSureModal: true })
  }

  _onCloseApprovalModal() {
    this.setState({ isOpenApprovalModal: false })
  }

  _onCloseRejectModal() {
    this.setState({ isOpenRejectModal: false })
  }

  _onCloseAreUSureModal() {
    this.setState({ isAreYouSureModal: false })
  }

  _onClickOpenFormSendingGift() {
    this.setState({ isSendingGift: true })
  }

  _onCloseFormSendingGift() {
    this.setState({ isSendingGift: false })
  }

  componentDidMount() {
    this.props.appActions.getConstruction(this.props.constructionId)
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

  updateStatusImg(type, id, status, billId, weigh) {
    this.props.appActions.updateStatusImage(id, type, status, this.props.constructionId, billId, weigh);
    this.imgViewerRef.close()
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



  render() {
    const construction = this.props.app.construction;
    const labels = this.props.app.labels;
    const labelOptions = labels && labels.map(e => { return { value: e.id, label: e.name } })
    const type = construction && TypeConstruction.findByType(construction.type)
    const status = construction && ConstructionStatus.findByStatus(construction.status);
    if (construction && construction.bills && construction.images) {
      this.isApproval = this.isCanApproval(construction.bills, construction.images);
    }
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
                      <td>{construction && construction.address}</td>
                    </tr>
                    <tr>
                      <th>Tỉnh / Huyện </th>
                      <td>Hồ Chí Minh / Quận 2</td>
                    </tr>
                    {type == NEXT_CONSTRUCTION &&
                      <tr>
                        <th>Tên: </th>
                        <td>{construction && construction.name}</td>
                      </tr>
                    }
                    {type == NEXT_CONSTRUCTION &&
                      <tr>
                        <th>SDT: </th>
                        <td>{construction && construction.phone}</td>
                      </tr>
                    }
                    <tr>
                      <th>Nhà thầu</th>
                      <td style={{ color: '#b71c1c' }}>{construction && <Link to={'/customer/' + construction.user.customerId}>{construction.user.name}</Link>}</td>
                    </tr>
                    {type == NOW_CONSTRUCTION &&
                      <tr>
                        <th>Tên cửa hàng: </th>
                        <td>{construction && construction.name}</td>
                      </tr>
                    }
                    {type == NOW_CONSTRUCTION &&
                      <tr>
                        <th>SDT cửa hàng: </th>
                        <td>{construction && construction.phone}</td>
                      </tr>
                    }
                    {type == NEXT_CONSTRUCTION &&
                      <tr>
                        <th>Thời gian khởi công: </th>
                        <td>{construction && new Date(construction.estimateTimeStart * 1000).toDateString()}</td>
                      </tr>
                    }
                    {type == NEXT_CONSTRUCTION &&
                      <tr>
                        <th>Loại công trình: </th>
                        <td>{construction && construction.typeConstruction}</td>
                      </tr>
                    }
                    {type == NOW_CONSTRUCTION &&
                      <tr>
                        <th>Số lượng sản phẩm: </th>
                        <td>{construction && construction.quantity}</td>
                      </tr>
                    }
                    <tr>
                      <th>Trạng thái</th>
                      <td>{status && status.getName()}</td>
                    </tr>
                    {type == NOW_CONSTRUCTION &&
                      <tr>
                        <th>Đã duyệt</th>
                        <td>{construction && construction.bills && this.countApproved(construction.bills)} hóa đơn,  {construction && construction.images && this.countApproved(construction.images)} hình ảnh</td>
                      </tr>
                    }
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
                  </tbody>
                </table>
              }
              {(labelOptions && construction && !construction.label) &&
                <div className="input-extra">
                  <div className="th">Nhãn công trình</div>
                  <div className="td"><ReactSelect placeholder="Gắn nhãn công trình giúp hệ thống phục vụ bản tốt hơn" options={labelOptions} ref={e => this.labelRef = e} /></div>
                </div>
              }
            </div>
          </div>
          {this.state.errorMsg && <div className="errorMsg-right">{this.state.errorMsg}</div>}
          <div className="action-container">
            <ui className="action-customer-detail">
              {construction && !construction.label &&
                <li><Link onClick={this._onClickOpenAreYouSureModal} className="add-butn">Cập nhật</Link></li>
              }
              {construction && construction.label && construction.status == ConstructionStatus.WAITING_APPROVAL.getStatus() &&
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

          {(type && type == NOW_CONSTRUCTION) &&
            <div className="central-meta">
              <h5 className="f-title bill">HÓA ĐƠN ({construction && construction.bills && construction.bills.length})</h5>
              <ul className="photos">
                {construction && construction.bills && construction.bills.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <a className="strip" href="#">
                        <img onClick={() => { this.imgViewerRef.open(item, 1) }} src={item.link} alt="" />
                        {item.status == ImageStatus.REJECTED.getStatus() && <div style={{ color: ImageStatus.ImageStatus.getColor(item.status) }} className="status">Reject</div>}
                      </a>
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
                        <img onClick={() => { this.imgViewerRef.open(item, 2) }} src={item.link} alt="" />
                        {item.status == ImageStatus.REJECTED.getStatus() && <div style={{ color: ImageStatus.ImageStatus.getColor(item.status) }} className="status">Reject</div>}
                      </a>
                    </li>
                  )
                })
                }
              </ul>
            </div>
          }

          <ImgViewer ref={e => this.imgViewerRef = e} updateStatus={this.updateStatusImg} />

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
