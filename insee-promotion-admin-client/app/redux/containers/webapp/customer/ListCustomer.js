import React, { Component } from 'react'
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';
import {
  Link
} from "react-router-dom";
import Location from '../../../../data/Location'

class ListCustomer extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      location : 0,
      status : 10
    }
    this.load = this.load.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this)
  }

  componentDidMount() {
    this.load();
  }

  load(status, location) {
    this.props.appActions.getListCustomerByStatus(status ? status : this.state.status, location ? location : this.state.location, this.state.page, this.state.pageSize);
  }

  onChangeStatus(status) {
    this.setState({ status: status })
    this.load(status, null);

  }

  onChangeLocation(event) {
    let location = event.target.value;
    this.setState({ location: location });
    this.load(null, location);
  }


  render() {
    let customers = this.props.app.customers;
    return (
      <div className="frnds">
        <ul className="nav nav-tabs">
          <li onClick={() => { this.onChangeStatus(10) }} className="nav-item"><a className={this.state.status == 10 ? 'active' : ''} >Tất cả</a></li>
          <li onClick={() => { this.onChangeStatus(NEED_REVIEW.getStatus()) }} className="nav-item"><a className={this.state.status == 2 ? 'active' : ''} >Chờ duyệt</a><span>60</span></li>
          <li onClick={() => { this.onChangeStatus(DO_NOT_HAVE_ACCOUNT.getStatus()) }} className="nav-item"><a className={this.state.status == 1 ? 'active' : ''} >Chưa có tài khoản</a><span>20</span></li>
          <li onClick={() => { this.onChangeStatus(APPROVED.getStatus()) }} className="nav-item"><a className={this.state.status == 4 ? 'active' : ''}>Đã duyệt</a><span>10</span></li>
        </ul>
        <div style={{ float: 'right' }}>
          <select onChange={this.onChangeLocation} value={this.state.location} style={{ width: '150px' }} class="form-control">
            <option value={0}>Tất cả</option>
            {Location.getList().map((item, index) => {
              return (
                <option key={index} value={item.key}>{item.value}</option>
              )
            })}
          </select>
        </div>

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
                            <a href="#" ><img src={item.avatar} alt="" /></a>
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
            {/* <div className="lodmore"><button className="btn-view btn-load-more" /></div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ListCustomer
