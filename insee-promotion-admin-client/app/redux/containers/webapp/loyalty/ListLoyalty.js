import React, { Component } from 'react'
import { GiftStatus, WAITING_RECEIVE, RECEIVED, ROLLED, WAITING_SENT } from '../../../../components/enum/GiftStatus'
import LoyaltyModel from '../../../../model/LoyaltyModel';
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';
import {
  Link,
} from "react-router-dom";
import { City } from '../../../../data/Location';

class ListLoyalty extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      page_loyalty: null
    }
    this.getList = this.getList.bind(this)

  }

  componentDidMount() {
    this.getList(this.state.page - 1, this.state.pageSize)
  }

  getList(page, pageSize) {
    LoyaltyModel.getList(page, pageSize)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({
            page_loyalty: resp.data
          })
        }
      })
  }


  render() {
    const page_loyalty = this.state.page_loyalty;
    return (
      <div className="frnds">
        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <div className="central-meta">
              <div className="about">
                <div className="col-lg-12 col-sm-12 pading0">
                  <table className="table">
                    <thead className=" insee-color">
                      <tr className="insee-color">
                        <th scope="col">STT</th>
                        <th scope="col">Thầu</th>
                        <th scope="col">Tỉnh</th>
                        <th scope="col">Tích lũy (tấn)</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {page_loyalty && page_loyalty.list && page_loyalty.list.map(function (item, index) {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.customer.fullName}</td>
                            <td>{City.getName(item.customer.mainAreaId)}</td>
                            <td>{item.ton / 1000}</td>
                            <td><Link to={`/customer/${item.customer.id}`} className="add-butn" data-ripple>Chi tiết</Link></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="paging-container">
              {page_loyalty && <Pagination defaultCurrent={1} current={this.state.page} onChange={this._onChangePage} total={page_loyalty.totalPage * page_loyalty.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListLoyalty
