import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import { City } from '../../../../data/Location'
import * as StatusConstruction from '../../../../components/enum/StatusConstruction'
import { NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2 } from '../../../../components/enum/TypeConstruction'
import { WAITING_APPROVAL, APPROVED, REJECTED, SEND_GIFT, RECIEVED } from '../../../../components/enum/StatusConstruction'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

class ListConstruction extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10,
      status: 0,
      type: NOW_CONSTRUCTION.getType()
    }
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeStatus = this.onChangeStatus.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.load(this.state.type, this.state.status, this.state.page, this.state.pageSize)
  }

  onChangeType(type) {
    this.setState({ type: type })
    this.load(type, this.state.status, this.state.page, this.state.pageSize);
  }

  onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status });
    this.load(this.state.type, status, this.state.page, this.state.pageSize);
  }

  onChangePage(pageNumber, pageSize) {
    pageNumber = pageNumber - 1
    this.setState({
      page: pageNumber
    })
    this.load(this.state.type, this.state.status, pageNumber, this.state.pageSize)
  }

  load(type, status, page, pageSize) {
    this.props.appActions.getListConstruction(type, status == 0 ? null : status, page, pageSize);
  }

  render() {
    let constructions = this.props.app.constructions;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li onClick={() => this.onChangeType(NOW_CONSTRUCTION.getType())} className={`item-left ${this.state.type == NOW_CONSTRUCTION.getType() && 'active'}`}><label>Upload hóa đơn (bags)</label></li>
              <li onClick={() => this.onChangeType(NOW_CONSTRUCTION_V2.getType())} className={`item-left ${this.state.type == NOW_CONSTRUCTION_V2.getType() && 'active'}`}><label>Upload hóa đơn (VND)</label></li>
              <li onClick={() => this.onChangeType(NEXT_CONSTRUCTION.getType())} className={`item-left ${this.state.type == NEXT_CONSTRUCTION.getType() && 'active'}`}><label>Công trình tiếp theo</label></li>
              <li className="item-right">
                <select onChange={this.onChangeStatus.bind(this)} value={this.state.status} class="form-control">
                  <option value={0}>Tất cả</option>
                  <option value={WAITING_APPROVAL.getStatus()}>Chờ duyệt</option>
                  <option value={APPROVED.getStatus()}>Đã duyệt</option>
                  <option value={REJECTED.getStatus()}>Đã từ chối</option>
                  <option value={SEND_GIFT.getStatus()}>Đã gửi quà</option>
                  <option value={RECIEVED.getStatus()}>Đã nhận</option>
                </select>
              </li>
            </ul>
          </div>
          {/* <div className="mesages-lists">
            <form method="post">
              <input type="text" placeholder="Search" />
            </form>
          </div> */}
        </div>
        {/* <div className="frnds" style={{margin: '28px 0px'}}>
          <ul className="nav nav-tabs">
          <li className="nav-item"><a className={this.state.currentStatus == 10 ? 'active' : ''} >Tất cả</a></li>
          <li className="nav-item"><a className={this.state.currentStatus == 2 ? 'active' : ''} >Chờ duyệt</a><span>60</span></li>
          <li className="nav-item"><a className={this.state.currentStatus == 1 ? 'active' : ''} >Đã duyệt</a><span>20</span></li>
        </ul> 
        </div> */}

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {constructions && constructions.list && constructions.list.map(function (item, key) {
                return (
                  <li key={key}>
                    <div className="nearly-pepls">
                      <div className="pepl-info row">
                        <div className="col-md-1">
                          <figure>
                            <Link to={'/customer/' + item.user.customerId} ><img src={item.user.avatar} alt="" /></Link>
                          </figure>
                        </div>
                        <div className="col-md-7">
                          <h4>{item.address}</h4>
                          <ul>
                            <li>{City.getName(item.city)}</li>
                            <li>{item.phone}</li>
                            <li>{StatusConstruction.findByStatus(item.status).getName()}</li>
                            <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                          </ul>
                        </div>
                        <div className="col-md-4 action">
                          <Link to={`/construction/${item.id}`} className="add-butn" data-ripple>Xem chi tiết</Link>
                        </div>

                      </div>
                    </div>
                  </li>
                )
              })}
              {constructions && constructions.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}

            </ul>
            <div className="paging-container">
              {constructions && <Pagination defaultCurrent={1} current={this.state.page + 1} onChange={this.onChangePage} total={constructions.totalPage * constructions.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListConstruction
