import React, { Component } from 'react'
import { CustomerStatusEnum, DO_NOT_HAVE_ACCOUNT, NEED_REVIEW, REJECTED, APPROVED } from '../../../../components/enum/CustomerStatusEnum';
import {
  Link
} from "react-router-dom";
import { City } from '../../../../data/Location'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import {TypeCustomer, CONTRUCTOR, RETAILER} from '../../../../components/enum/TypeCustomer'


class ListCustomer extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      location: 0,
      status: 10
    }
    this.load = this.load.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.load();
  }

  load(status, location, page) {
    this.props.appActions.getListCustomerByStatus(status ? status : this.state.status,
      location ? location : this.state.location,
      page != null ? page : this.state.page, this.state.pageSize);
  }

  onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status, page: 0 })
    this.load(status, null, 0);
  }

  onChangePage(pageNumber, pageSize) {
    pageNumber = pageNumber - 1
    console.log(pageNumber)
    this.setState({
      page: pageNumber
    })
    this.load(null, null, pageNumber)
  }

  onChangeLocation(event) {
    let location = event.target.value;
    this.setState({ location: location, page: 0 });
    this.load(null, location, 0);
  }


  render() {
    let customers = this.props.app.customers;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li>
                <label>Trạng thái</label>
                <select onChange={this.onChangeStatus} value={this.state.type} class="form-control">
                  <option value={10}>Tất cả</option>
                  <option value={NEED_REVIEW.getStatus()}>Chờ duyệt</option>
                  <option value={APPROVED.getStatus()}>Đã duyệt</option>
                </select>
              </li>
              <li>
                <label>Tỉnh thành</label>
                <select onChange={this.onChangeLocation} value={this.state.location} className="form-control">
                  <option value={0}>Tất cả</option>
                  {City.getList().map((item, index) => {
                    return (
                      <option key={index} value={item.key}>{item.value}</option>
                    )
                  })}
                </select>
              </li>
            </ul>
          </div>
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
                            {/* <li>{TypeCustomer.get()}</li> */}
                            <li>{DateTimeUtil.diffTime(item.createdTime)}</li>
                            <li>{City.getName(item.mainAreaId)}</li>
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
            <div className="paging-container">
              {customers && <Pagination defaultCurrent={1} current={this.state.page + 1} onChange={this.onChangePage} total={customers.totalPage * customers.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListCustomer
