import React, { Component } from 'react'
import DateTimeUtil from '../../../../utils/DateTimeUtil'
import { Pagination } from 'antd';
import {
  Link,
} from "react-router-dom";
import MatchModel from '../../../../model/MatchModel';
import { MatchStatus, DONE } from '../../../../components/enum/MatchStatus'

class ListMatch extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10,
      status: -1,
      season: 4,
      page_match: null
    }
    this.getList = this.getList.bind(this)
    this._onChangeStatus = this._onChangeStatus.bind(this)
    this._onChangeSeason = this._onChangeSeason.bind(this)
    this._onChangePage = this._onChangePage.bind(this)
  }

  componentDidMount() {
    this.getList(this.state.status, this.state.season, this.state.page, this.state.pageSize)
  }

  getList(status, season, page, pageSize) {
    MatchModel.find(status, season, page - 1, pageSize)
      .then(resp => {
        this.setState({ page_match: resp.data })
      })
  }

  _onChangeStatus(event) {
    let status = event.target.value;
    this.setState({ status: status })
    this.getList(status, this.state.season, this.state.page, this.state.pageSize)
  }

  _onChangeSeason(event) {
    let season = event.target.value;
    this.setState({ season: season })
    this.getList(this.state.status, season, this.state.page, this.state.pageSize)
  }

  _onChangePage(pageNumber, pageSize) {
    this.getList(this.state.status, this.state.season, pageNumber, this.state.pageSize)
    this.setState({ page: pageNumber })
  }


  render() {
    const page_match = this.state.page_match;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li>
                <label>Giải đấu:</label>
                <select value={this.state.season} onChange={this._onChangeSeason} className="form-control">
                  <option value={1}>Vòng Loại Wordcup</option>
                  <option value={2}>EURO 2021</option>
                  <option value={3}>VÒNG LOẠI WC 3</option>
                  <option value={4}>Seagame 2022</option>
                </select>
              </li>
              <li>
                <label>Trạng thái:</label>
                <select onChange={this._onChangeStatus} value={this.state.status} className="form-control">
                  <option value={-1}>Tất cả</option>
                  {MatchStatus.getList().map((item, index) => {
                    return (
                      <option key={index} value={item.id}>{item.name}</option>
                    )
                  })}
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {page_match && page_match.list && page_match.list.map(function (item, key) {
                let matchStatus = MatchStatus.findById(item.status);
                return (
                  <li key={key} style={{ cursor: 'pointer' }}>
                    <Link to={`/match/${item.id}`}>
                      <div className="nearly-pepls">
                        <div className="pepl-info row">
                          <div className={`col-md-12 info-match ${matchStatus.id == DONE.id && 'done'}`}>
                            <div className="team win team-one">
                              <h5>{item.teamOne.name}
                                {matchStatus.id == DONE.id && <p>{item.teamOneScore}</p>}
                              </h5>
                              <img src={item.teamOne.icon} />
                            </div>
                            <div className="team team-two">
                              <img src={item.teamTwo.icon} />
                              <h5>{item.teamTwo.name}
                                {matchStatus.id == DONE.id && <p>{item.teamTwoScore}</p>}
                              </h5>
                            </div>
                          </div>
                          <div className="col-md-12 status-match">
                            <ul>
                              <li>{DateTimeUtil.parseTime(item.timeStart)}</li>
                              <li style={{ color: 'green' }}>{matchStatus.name}</li>
                              <li>{item.totalPredict} người tham gia</li>
                              {matchStatus.id == DONE.id &&
                                <li>{item.totalFailedPredict} người dự đoán sai</li>
                              }
                              {matchStatus.id == DONE.id &&
                                <li style={{color: 'red'}}>{item.totalSuccessPredict} người dự đoán trúng</li>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
              {page_match && page_match.list && page_match.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có trận đấu nào ở đây</div>}

            </ul>
            <div className="paging-container">
              {page_match && <Pagination defaultCurrent={1} current={this.state.page} onChange={this._onChangePage} total={page_match.totalPage * page_match.pageSize} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListMatch
