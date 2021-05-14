import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';
import ApprovalCustomerModal from '../../../../components/modal/ApprovalCustomerModal'
import RejectCustomerModal from '../../../../components/modal/RejectCustomerModal'
import { findByStatus } from '../../../../components/enum/StatusConstruction'
import { City } from '../../../../data/Location'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import { TypeCustomer, CONTRUCTOR, RETAILER } from '../../../../components/enum/TypeCustomer'

class CustomerDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isDeleteUserModal: false,
      isEditing: false
    }
    this._onClickOpenApprovalModal = this._onClickOpenApprovalModal.bind(this)
    this._onCloseApprovalModal = this._onCloseApprovalModal.bind(this)
    this._onClickOpenRejectModal = this._onClickOpenRejectModal.bind(this)
    this._onCloseRejectModal = this._onCloseRejectModal.bind(this)
    this._onClickOpenDeleteModal = this._onClickOpenDeleteModal.bind(this)
    this._onCloseDeleteModal = this._onCloseDeleteModal.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
  }

  _onClickOpenApprovalModal() {
    this.setState({ isOpenApprovalModal: true })
  }

  _onClickOpenRejectModal() {
    this.setState({ isOpenRejectModal: true })
  }

  _onClickOpenDeleteModal() {
    this.setState({ isDeleteUserModal: true })
  }

  _onCloseApprovalModal() {
    this.setState({ isOpenApprovalModal: false })
  }

  _onCloseRejectModal() {
    this.setState({ isOpenRejectModal: false })
  }

  _onCloseDeleteModal() {
    this.setState({ isDeleteUserModal: false })
  }

  deleteCustomer() {
    this.setState({ isDeleteUserModal: false })
    this.props.appActions.deleteCustomer(this.props.customerId)
  }

  componentDidMount() {
    this.props.appActions.getCustomerById(this.props.customerId)
    this.props.appActions.getHistoryByCustomerId(this.props.customerId);
  }

  onClickSave() {
    let role = this.roleSelectRef.value;
    this.setState({ isEditing: false })
    this.props.appActions.updateRoleCustomer(this.props.customerId, role);
  }


  render() {
    const customer = this.props.app.customer;
    const historyByCustomer = this.props.app.historyByCustomer;
    const status = customer && CustomerStatusEnum.findByStatus(customer.status);
    const type = customer && TypeCustomer.findByType(customer.user.roleId)
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">{`THÔNG TIN ${type == CONTRUCTOR ? 'NHÀ THẦU' : 'CỬA HÀNG'}`}</h5>
              </div>
              {customer &&
                <table className="table table-responsive table-info-contractor">
                  <tbody>
                    <tr>
                      <th>Họ tên</th>
                      <td>{customer.fullName}</td>
                    </tr>
                    <tr>
                      <th>Số điện thoại</th>
                      <td>{customer.phone}</td>
                    </tr>
                    <tr>
                      <th>Khu vực</th>
                      <td>{City.getName(customer.mainAreaId)}</td>
                    </tr>
                    <tr>
                      <th>Trang thái</th>
                      <td style={{ color: `${status.getColor()}` }}>{status.getName()}</td>
                    </tr>
                    <tr>
                      <th>Thời gian</th>
                      <td>{DateTimeUtil.diffTime(customer.createdTime)}</td>
                    </tr>
                    <tr>
                      <th>Loại tài khoản</th>
                      {!this.state.isEditing &&
                        <td>{type.getName()} <span onClick={() => { this.setState({ isEditing: true }) }} className="icon-edit fas fa-edit"></span></td>
                      }
                      {this.state.isEditing &&
                        <td>
                          <select ref={e => this.roleSelectRef = e} defaultValue={type.getType()}>
                            <option value={CONTRUCTOR.getType()}>Nhà Thầu</option>
                            <option value={RETAILER.getType()}>Cửa hàng</option>
                          </select>
                          <span onClick={this.onClickSave} className="icon-edit-save icon-edit fas fa-check"></span>
                        </td>
                      }
                    </tr>
                    {/* {status == APPROVED &&
                      <tr>
                        <th>Số  CT đã tham gia </th>
                        <td>10 / 15 </td>
                      </tr>
                    } */}
                  </tbody>
                </table>
              }
            </div>
          </div>
          {/* 
          <div className="action-container">
            <ui className="action-customer-detail">
              <li><Link onClick={this._onClickOpenDeleteModal} style={{backgroundColor: '#9E9E9E'}} className="add-butn" data-ripple>Delete</Link></li>
            </ui>
          </div> */}

          <div className="action-container">
            <ui className="action-customer-detail">
              {status && status.getStatus() == NEED_REVIEW.getStatus() && <li><Link onClick={this._onClickOpenApprovalModal} className="add-butn" data-ripple>Chấp nhận</Link></li>}
              {status && status.getStatus() == NEED_REVIEW.getStatus() && <li><Link onClick={this._onClickOpenRejectModal} className="add-butn" data-ripple>Từ chối</Link></li>}
              <li><Link onClick={this._onClickOpenDeleteModal} style={{ backgroundColor: '#9E9E9E' }} className="add-butn" data-ripple>Delete</Link></li>
            </ui>
          </div>

          {status && status.getStatus() == REJECTED.getStatus() &&
            <div className="action-container">
              <ui className="action-customer-detail">
                <li><Link onClick={this._onClickOpenApprovalModal} className="add-butn" data-ripple>Chấp nhận</Link></li>
              </ui>
            </div>
          }

          {/* <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">TÀI KHOẢN</h5>
              </div>
              {customer &&
                <table className="table table-responsive table-info-contractor">
                  <tbody>
                    <tr>
                      <th>Phone</th>
                      <td>{customer.phone}</td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div> */}

          {historyByCustomer && historyByCustomer.length > 0 &&
            <div className="central-meta">
              <div className="about">
                <div className="personal">
                  <h5 className="f-title">Danh sách các chương trình đã tham gia</h5>
                </div>
                <div className="col-lg-12 col-sm-12 pading0">
                  <table className="table">
                    <thead className=" insee-color">
                      <tr className="insee-color">
                        <th scope="col">STT</th>
                        <th scope="col">Chương trình khuyến mãi</th>
                        <th scope="col">Quà tặng</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyByCustomer.map((item, index) => {
                        let status = findByStatus(item.status).getName();
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.promotion.title}</td>
                            <td>{item.gift && item.gift.name}</td>
                            <td>{status}</td>
                            <td>{DateTimeUtil.diffTime(item.updatedTime)}</td>
                          </tr>
                        )
                      })}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {customer &&
            <ApprovalCustomerModal {...this.props} id={customer.id} isOpen={this.state.isOpenApprovalModal} onClose={this._onCloseApprovalModal} />
          }
          {customer &&
            <RejectCustomerModal {...this.props} id={customer.id} isOpen={this.state.isOpenRejectModal} onClose={this._onCloseRejectModal} />
          }
          <AreYouSureModal isOpen={this.state.isDeleteUserModal} onOK={this.deleteCustomer} onClose={this._onCloseDeleteModal} />

          {/* <div className="popup-wraper3 active">
            <div className="popup">
              <span className="popup-closed"><i className="ti-close" /></span>
              <div className="popup-meta">
                <div className="popup-head">
                  <h5>Ghi chú</h5>
                </div>
                <div className="Rpt-meta">
                  <span style={{color: '#fa6342'}}>We're sorry something's wrong. How can we help?</span>
                  <div method="post">
                    <div>
                      <label>Write about Report</label>
                      <textarea placeholder="write someting about Post" rows={2} defaultValue={""} />
                    </div>
                    <div className="btn-bar">
                      <a className="add-butn" >Submit</a>
                      <a className="add-butn cancel">Close</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    )
  }
}

export default CustomerDetail
