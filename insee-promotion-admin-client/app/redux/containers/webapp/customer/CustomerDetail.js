import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';
import ApprovalCustomerModal from '../../../../components/modal/ApprovalCustomerModal'
import RejectCustomerModal from '../../../../components/modal/RejectCustomerModal'


class CustomerDetail extends Component {

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
  }

  _onClickOpenApprovalModal() {
    this.setState({isOpenApprovalModal: true})
  }

  _onClickOpenRejectModal() {
    this.setState({isOpenRejectModal: true})
  }

  _onCloseApprovalModal() {
    this.setState({isOpenApprovalModal: false})
  }

  _onCloseRejectModal() {
    this.setState({isOpenRejectModal: false})
  }

  componentDidMount() {
    this.props.appActions.getCustomerById(this.props.customerId)
  }



  render() {
    const customer = this.props.app.customer;
    var status;
    if (customer) {
      status = CustomerStatusEnum.findByStatus(customer.finalStatus);
    }
    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">THÔNG TIN NHÀ THẦU</h5>
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
                      <th>Khu vực thi công</th>
                      <td>Hồ Chí Minh</td>
                    </tr>
                    <tr>
                      <th>Trang thái</th>
                      <td style={{ color: `${status.getColor()}` }}>{status.getName()}</td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>

          {status && status.getStatus() == NEED_REVIEW.getStatus() &&
            <div className="action-container">
              <ui className="action-customer-detail">
                <li><Link onClick={this._onClickOpenApprovalModal} className="add-butn" data-ripple>Approval</Link></li>
                <li><Link onClick={this._onClickOpenRejectModal} className="add-butn" data-ripple>Reject</Link></li>
              </ui>
            </div>
          }

          <div className="central-meta">
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
          </div>

          <ApprovalCustomerModal isOpen={this.state.isOpenApprovalModal} onClose={this._onCloseApprovalModal}/>
          <RejectCustomerModal isOpen={this.state.isOpenRejectModal} onClose={this._onCloseRejectModal} />
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
