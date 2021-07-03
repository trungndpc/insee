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
import LoyaltyModel from '../../../../model/LoyaltyModel';

class CustomerDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenApprovalModal: false,
      isOpenRejectModal: false,
      isDeleteUserModal: false,
      isEditing: false,
      loyalty: null,
      tab: location.hash.substr(1) ? location.hash.substr(1) : 1
    }
    this._onClickOpenApprovalModal = this._onClickOpenApprovalModal.bind(this)
    this._onCloseApprovalModal = this._onCloseApprovalModal.bind(this)
    this._onClickOpenRejectModal = this._onClickOpenRejectModal.bind(this)
    this._onCloseRejectModal = this._onCloseRejectModal.bind(this)
    this._onClickOpenDeleteModal = this._onClickOpenDeleteModal.bind(this)
    this._onCloseDeleteModal = this._onCloseDeleteModal.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
    this.getLoyalty = this.getLoyalty.bind(this)
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

  getLoyalty() {
    LoyaltyModel.get(this.props.customerId)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ loyalty: resp.data })
        }
      })
  }

  componentDidMount() {
    this.props.appActions.getCustomerById(this.props.customerId)
    this.props.appActions.getHistoryByCustomerId(this.props.customerId);
    this.getLoyalty()
  }

  onClickSave() {
    let role = this.roleSelectRef.value;
    this.setState({ isEditing: false })
    this.props.appActions.updateRoleCustomer(this.props.customerId, role);
  }


  render() {
    const customer = this.props.app.customer;
    let historyByCustomer = this.props.app.historyByCustomer;
    if (historyByCustomer && this.state.tab == 2) {
      historyByCustomer = historyByCustomer.filter(e => e.type == 4);
    }
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
                    {this.state.loyalty && this.state.loyalty[0] &&
                      <tr>
                        <th>Tích lũy</th>
                        <td>{this.state.loyalty[0].ton / 1000} (tấn)</td>
                      </tr>
                    }

                  </tbody>
                </table>
              }
            </div>
          </div>
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

          {historyByCustomer &&
            <div className="central-meta">
              <div className="about">
                <div className="personal">
                  <ul className="tab-construction">
                    <li onClick={() => { this.setState({ tab: 1 }) }} className={this.state.tab == 1 && 'active'}>Công trình</li>
                    <li onClick={() => { this.setState({ tab: 2 }) }} className={this.state.tab == 2 && 'active'}>Loyalty</li>
                  </ul>
                </div>
                <div className="col-lg-12 col-sm-12 pading0">
                  <table className="table">
                    <thead className=" insee-color">
                      <tr className="insee-color">
                        <th scope="col">STT</th>
                        <th scope="col">Công trình</th>
                        {this.state.tab == 2 &&
                          <th scope="col">Số bao</th>
                        }
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Thời gian</th>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {historyByCustomer.map((item, index) => {
                        let status = findByStatus(item.status).getName();
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.address}</td>
                            {this.state.tab == 2 &&
                              <td>{item.quantity}</td>
                            }
                            <td>{status}</td>
                            <td>{DateTimeUtil.diffTime(item.updatedTime)}</td>
                            <td>
                              <Link to={`/construction/${item.id}`} className="add-butn" data-ripple>Chi tiết</Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  {historyByCustomer.length == 0 && <div style={{ textAlign: 'center' }}>Chưa có công trình</div>}
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

        </div>
      </div>
    )
  }
}

export default CustomerDetail
