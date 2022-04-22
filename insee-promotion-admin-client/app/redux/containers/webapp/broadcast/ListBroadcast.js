import React, { Component } from 'react'
import LoyaltyModel from '../../../../model/LoyaltyModel';
import { Pagination } from 'antd';
import { City } from '../../../../data/Location';
import { PHEN_MAM } from '../../../../components/enum/TypeLoyalty';
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'


class ListBroadcast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      page_loyalty: null,
      isAreYouSureModal: false,
    }
    this.getList = this.getList.bind(this)
    this._onChangePage = this._onChangePage.bind(this)
    this._onClickApproval = this._onClickApproval.bind(this)
  }

  componentDidMount() {
    this.getList(this.state.page, this.state.pageSize)
  }

  getList(page, pageSize) {
    LoyaltyModel.getList(PHEN_MAM.getType(), page - 1, pageSize)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({
            page_loyalty: resp.data
          })
        }
      })
  }

  _onChangePage(pageNumber, pageSize) {
    this.getList(pageNumber, this.state.pageSize)
    this.setState({ page: pageNumber })
  }

  _onClickApproval(id) {
    this.setState({ isAreYouSureModal: true })
  }


  render() {
    const page_loyalty = this.state.page_loyalty;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li style={{ float: 'right', paddingTop: '14px', textAlign: 'center', margin: '0' }}>
                <a className="add-butn post-btn" href="/broadcast/create">
                  <span style={{ color: '#fff !important' }} className="mbtn">Thêm</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane active fade show" >
            <div className="central-meta">
              <div className="about">
                <div className="col-lg-12 col-sm-12 pading0">
                  <table className="table">
                    <thead className=" insee-color">
                      <tr className="insee-color">
                        <th>STT</th>
                        <th>Chủ đề</th>
                        <th>Thời gian</th>
                        <th>Tỉnh thành</th>
                        <th>Trạng thái</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {page_loyalty && page_loyalty.list && page_loyalty.list.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.customer.fullName}</td>
                            <td>{City.getName(item.customer.mainAreaId)}</td>
                            <td>{item.bags}</td>
                            <td>Chờ duyệt</td>
                            <td><a onClick={() => { this._onClickApproval(item.id) }} className="add-butn">Duyệt</a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="paging-container">
              {page_loyalty && <Pagination defaultCurrent={1} current={this.state.page}
                onChange={this._onChangePage} total={page_loyalty.totalPage * page_loyalty.pageSize} />}
            </div>
          </div>
          <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={() => { }}
            onClose={() => { this.setState({ isAreYouSureModal: false }) }} />
        </div>
      </div>
    )
  }
}

export default ListBroadcast
