import React, { Component } from 'react'
import BroadcastModel from '../../../../model/BroadcastModel';
import { Pagination } from 'antd';
import { City } from '../../../../data/Location';
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import { StatusBroadcast, APPROVED, INIT } from '../../../../components/enum/StatusBroadcast'
import moment from 'moment'
import AlertUtils from '../../../../utils/AlertUtils'


class ListBroadcast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      page_broadcast: null,
      isAreYouSureModal: false,
      idApproval: null
    }
    this.getList = this.getList.bind(this)
    this._onChangePage = this._onChangePage.bind(this)
    this._onClickApproval = this._onClickApproval.bind(this)
    this.approval = this.approval.bind(this)
  }

  componentDidMount() {
    this.getList(this.state.page, this.state.pageSize)
  }

  getList(page, pageSize) {
    BroadcastModel.getList(page - 1, pageSize)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({
            page_broadcast: resp.data
          })
        }
      })
  }

  _onChangePage(pageNumber, pageSize) {
    this.getList(pageNumber, this.state.pageSize)
    this.setState({ page: pageNumber })
  }

  _onClickApproval(id) {
    this.setState({ isAreYouSureModal: true, idApproval: id })
  }

  approval() {
    let id = this.state.idApproval;
    BroadcastModel.updateStatus(id, APPROVED.getStatus())
      .then(resp => {
        if (resp.error == 0) {
          this.getList(this.state.page, this.state.pageSize)
          AlertUtils.showSuccess('Thành công!')
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  render() {
    const page_broadcast = this.state.page_broadcast;
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
                      {page_broadcast && page_broadcast.list && page_broadcast.list.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{moment(new Date(item.timeStart)).format("kk:mm YYYY-MM-DD ")}</td>
                            <td>{!item.cityIds ? 'ALL' : item.cityIds.map(id => City.getName(id)).join(",")}</td>
                            <td>{StatusBroadcast.findBySatus(item.status).getName()}</td>
                            <td>{item.status == INIT.getStatus() && <a onClick={() => { this._onClickApproval(item.id) }} className="add-butn">Duyệt</a>}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="paging-container">
              {page_broadcast && <Pagination defaultCurrent={1} current={this.state.page}
                onChange={this._onChangePage} total={page_broadcast.totalPage * page_broadcast.pageSize} />}
            </div>
          </div>
          <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={() => { this.approval() }}
            onClose={() => { this.setState({ isAreYouSureModal: false }) }} />
        </div>
      </div>
    )
  }
}

export default ListBroadcast
