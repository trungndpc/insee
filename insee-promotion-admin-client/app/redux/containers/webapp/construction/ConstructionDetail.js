import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';
import ApprovalCustomerModal from '../../../../components/modal/ApprovalCustomerModal'
import RejectCustomerModal from '../../../../components/modal/RejectCustomerModal'
import { TypeConstruction, NEXT_CONSTRUCTION, NOW_CONSTRUCTION } from '../../../../components/enum/TypeConstruction'
import ImgViewer from '../../../../components/layout/ImgViewer'
import * as ImageStatus from '../../../../components/enum/ImageStatus'

class ConstructionDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false
    }
    this._onClickOpenApprovalModal = this._onClickOpenApprovalModal.bind(this)
    this._onCloseApprovalModal = this._onCloseApprovalModal.bind(this)
    this._onClickOpenRejectModal = this._onClickOpenRejectModal.bind(this)
    this._onCloseRejectModal = this._onCloseRejectModal.bind(this)
    this.updateStatusImg = this.updateStatusImg.bind(this)
  }

  _onClickOpenApprovalModal() {
    this.setState({ isOpenApprovalModal: true })
  }

  _onClickOpenRejectModal() {
    this.setState({ isOpenRejectModal: true })
  }

  _onCloseApprovalModal() {
    this.setState({ isOpenApprovalModal: false })
  }

  _onCloseRejectModal() {
    this.setState({ isOpenRejectModal: false })
  }

  componentDidMount() {
    this.props.appActions.getConstruction(this.props.constructionId)
  }


  countApproved(bills) {
    console.log(ImageStatus.APPROVED.getStatus())
    let arr = bills.filter(e =>  e.status == ImageStatus.APPROVED.getStatus() );
    return arr ? arr.length : 0
  }

  updateStatusImg(type, id, status) {
    console.log("type: " + type + ", id: " + id + ", status: " + status)
    this.props.appActions.updateStatusImage(type, status, id);
    this.imgViewerRef.close()
  }



  render() {
    const construction = this.props.app.construction;
    const type = construction && TypeConstruction.findByType(construction.type)
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
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
                      <td>Đã duyệt</td>
                    </tr>
                    {type == NOW_CONSTRUCTION &&
                      <tr>
                        <th>Đã duyệt</th>
                        <td>{construction && construction.bills && this.countApproved(construction.bills)} hóa đơn,  {construction && construction.images && this.countApproved(construction.images)} hình ảnh</td>
                      </tr>
                    }
                  </tbody>
                </table>
              }
            </div>
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

        <ImgViewer ref={e => this.imgViewerRef = e} updateStatus={this.updateStatusImg}/>



          {status && status.getStatus() == NEED_REVIEW.getStatus() &&
            <div className="action-container">
              <ui className="action-customer-detail">
                <li><Link onClick={this._onClickOpenApprovalModal} className="add-butn" data-ripple>Approval</Link></li>
                <li><Link onClick={this._onClickOpenRejectModal} className="add-butn" data-ripple>Reject</Link></li>
              </ui>
            </div>
          }

          {/* {customer &&
            <ApprovalCustomerModal {...this.props} id={customer.id} isOpen={this.state.isOpenApprovalModal} onClose={this._onCloseApprovalModal} />
          }
          {customer &&
            <RejectCustomerModal {...this.props} id={customer.id} isOpen={this.state.isOpenRejectModal} onClose={this._onCloseRejectModal} />
          } */}
        </div>
      </div>
    )
  }
}

export default ConstructionDetail
