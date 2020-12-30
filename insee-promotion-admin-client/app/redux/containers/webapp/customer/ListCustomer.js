import React, { Component } from 'react'
import {CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED} from '../../../../components/enum/CustomerStatusEnum';
import {
  Link
} from "react-router-dom";

class ListCustomer extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10
    }
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    this.props.appActions.getListCustomerAll(this.state.page, this.state.pageSize);
  }

  load(status) {
    if (!status) {
      this.setState({ currentStatus: 10 })
      this.props.appActions.getListCustomerAll(this.state.page, this.state.pageSize);
    } else {
      this.setState({ currentStatus: status.getStatus() })
      this.props.appActions.getListCustomerByStatus(status.getStatus(), this.state.page, this.state.pageSize);
    }
  }


  render() {
    let customers = this.props.app.customers;
    return (
      <div className="frnds">
        <ul className="nav nav-tabs">
          <li onClick={() => { this.load(null) }} className="nav-item"><a className={this.state.currentStatus == 10 ? 'active' : ''} >Tất cả</a></li>
          <li onClick={() => { this.load(NEED_REVIEW) }} className="nav-item"><a className={this.state.currentStatus == 2 ? 'active' : ''} >Chờ duyệt</a><span>60</span></li>
          <li onClick={() => { this.load(DO_NOT_HAVE_ACCOUNT) }} className="nav-item"><a className={this.state.currentStatus == 1 ? 'active' : ''} >Chưa có tài khoản</a><span>20</span></li>
          <li onClick={() => { this.load(APPROVED) }} className="nav-item"><a className={this.state.currentStatus == 4 ? 'active' : ''}>Đã duyệt</a><span>10</span></li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {customers && customers.list && customers.list.map(function (item, key) {
                let status = CustomerStatusEnum.findByStatus(item.finalStatus);
                return (
                  <li key={key}>
                    <div className="nearly-pepls">
                      <div className="pepl-info row">
                        <div className="col-md-1">
                          <figure>
                            <a href="time-line.html" ><img src={item.avatar} alt="" /></a>
                          </figure>
                        </div>
                        <div className="col-md-7">
                          <h4>{item.fullName}</h4>
                          <ul>
                            <li>Hồ Chí Minh</li>
                            <li style={{ color: `${status.getColor()}` }}>{status.getName()}</li>
                          </ul>
                        </div>
                        <div className="col-md-4 action">
                          <Link to={`/customer/${item.id}`} className="add-butn" data-ripple>Xem chi tiết</Link>
                        </div>

                      </div>
                    </div>
                  </li>
                )
              })}

            </ul>
            <div className="lodmore"><button className="btn-view btn-load-more" /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListCustomer
