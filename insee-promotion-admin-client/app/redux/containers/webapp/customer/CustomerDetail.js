import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';


class CustomerDetail extends Component {

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
                      <td style={{color: `${status.getColor()}`}}>{status.getName()}</td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>

          {status && status.getStatus() == NEED_REVIEW.getStatus() &&
          <div className="action-container">
            <ui className="action-customer-detail">
              <li><Link className="add-butn" data-ripple>Approval</Link></li>
              <li><Link className="add-butn" data-ripple>Reject</Link></li>
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

        </div>
      </div>
    )
  }
}

export default CustomerDetail
