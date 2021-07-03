import React, { Component } from 'react'
import {
  Link,
} from "react-router-dom";
import { match } from 'sinon';
import MatchModel from '../../../../model/MatchModel'
import PredictModel from '../../../../model/PredictModel'
import { MatchStatus, PROCESSING, DONE } from '../../../../components/enum/MatchStatus'
import DateTimeUtil from '../../../../utils/DateTimeUtil';
import { PredictStatus, SUCCESS } from '../../../../components/enum/PredictStatus';
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import SendGiftModal from '../../../../components/modal/SendGiftModal'
import AlertUtils from '../../../../utils/AlertUtils';
import { Pagination } from 'antd';
import PromotionModel from '../../../../model/PromotionModel';

class MatchDetail extends Component {


  constructor(props) {
    super(props)
    this.state = {
      match: null,
      page_predict: null,
      isUpdateResultModal: false,
      msg: null,
      predict_to_send_gift: null,
      isSendingGift: false,
      page: 1,
      pageSize: 10
    }
    this.getGift = this.getGift.bind(this)
    this.getListPredict = this.getListPredict.bind(this)
    this.onClickUpdateResultModal = this.onClickUpdateResultModal.bind(this)
    this.updateResult = this.updateResult.bind(this)
    this.onClickSendGift = this.onClickSendGift.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.getGift(this.props.matchId)
    this.getListPredict(this.props.matchId, this.state.page, this.state.pageSize)
  }

  getGift(id) {
    MatchModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ match: resp.data })
        }
      })
  }

  getListPredict(id, page, pageSize) {
    PredictModel.find(id, page - 1, pageSize)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({
            page_predict: resp.data
          })
        }
      })
  }

  onClickUpdateResultModal() {
    let teamOneScore = this.teamOneScoreInput && this.teamOneScoreInput.value;
    let teamTwoScore = this.teamTwoScoreInput && this.teamTwoScoreInput.value;
    if (!teamOneScore || !teamTwoScore) {
      this.setState({ msg: 'Vui lòng nhập kết quả trận đấu' })
      return;
    } else {
      this.setState({ msg: null })
    }

    this.setState({ isUpdateResultModal: true })
  }

  onClickSendGift(predict) {
    this.setState({predict_to_send_gift: predict, isSendingGift: true})
  }

  updateResult() {
    let teamOneScore = this.teamOneScoreInput && this.teamOneScoreInput.value;
    let teamTwoScore = this.teamTwoScoreInput && this.teamTwoScoreInput.value;
    MatchModel.updateResult(this.props.matchId, teamOneScore, teamTwoScore)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess("Thành công")
          this.getGift(this.props.matchId)
          this.getListPredict(this.props.matchId)
        }
      })
  }

  onChangePage(pageNumber) {
    this.setState({ page: pageNumber })
    this.getListPredict(this.props.matchId, pageNumber, this.state.pageSize)
  }


  render() {
    const match = this.state.match
    const status = match && MatchStatus.findById(match.status)
    const page_predict = this.state.page_predict;
    return (
      <div className="frnds">

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct match-detail">
              <li>
                <div className="nearly-pepls">
                  <div className="pepl-info row">
                    <div className="col-md-12 info-match">
                      <div className="team win team-one">
                        <h5>{match && match.teamOne.name}
                          <p>
                            {status && status.id == DONE.id && match.teamOneScore}
                            {status && status.id == PROCESSING.id && <input ref={e => this.teamOneScoreInput = e} type="number" />}
                          </p>
                        </h5>
                        {match && <img src={match.teamOne.icon} />}
                      </div>
                      <div className="team team-two">
                        {match && <img src={match.teamTwo.icon} />}
                        <h5>{match && match.teamTwo.name}
                          <p>
                            {status && status.id == DONE.id && match.teamTwoScore}
                            {status && status.id == PROCESSING.id && <input ref={e => this.teamTwoScoreInput = e} type="number" />}
                          </p>
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-12 status-match">
                      <ul>
                        <li>{match && DateTimeUtil.diffTime(match.timeStart)}</li>
                        <li style={{ color: 'green' }}>{status && status.name}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div style={{ textAlign: 'right' }} className="msg-container">
            {this.state.msg && <p style={{ color: 'red' }}>{this.state.msg}</p>}
          </div>
          <div className="action-container">
            <ui className="action-customer-detail">
              {status && status.id == PROCESSING.id && <li><Link onClick={this.onClickUpdateResultModal} className="add-butn">Cập nhật kết quả</Link></li>}
            </ui>
          </div>
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">Danh sách các nhà thầu đã tham gia</h5>
              </div>
              <div className="col-lg-12 col-sm-12 pading0">
                <table className="table">
                  <thead className=" insee-color">
                    <tr className="insee-color">
                      <th scope="col">ID</th>
                      <th scope="col">Nhà thầu</th>
                      <th scope="col">Dự đoán</th>
                      <th scope="col">Kết quả</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
                    {page_predict && page_predict.list && page_predict.list.map(function (item, key) {
                      let predictStatus = PredictStatus.findById(item.status);
                      return (
                        <tr key={key}>
                          <th scope="row">{item.id}</th>
                          <td>{item.customer.fullName}</td>
                          <td>{`${item.teamOneScore} - ${item.teamTwoScore}`}</td>
                          <td>{predictStatus.name}</td>
                          <td>{DateTimeUtil.diffTime(item.updatedTime)}</td>
                          <td>{predictStatus == SUCCESS && <Link onClick={() => {this.onClickSendGift(item)}} className="add-butn">Gửi quà</Link>}</td>
                        </tr>
                      )
                    }.bind(this))}
                  </tbody>
                </table>
              </div>
            </div>
            {page_predict && 
            <div className="paging-container">
              <Pagination defaultCurrent={1} current={this.state.page} total={page_predict.totalPage * page_predict.pageSize} onChange={this.onChangePage} />
            </div>
            }
          </div>
          <AreYouSureModal isOpen={this.state.isUpdateResultModal}
            onOK={this.updateResult}
            onClose={() => this.setState({ isUpdateResultModal: false })} />

          {this.state.predict_to_send_gift && 
          <SendGiftModal {...this.props} 
              promotionId={this.state.predict_to_send_gift.seasonId}
              predictId={this.state.predict_to_send_gift.id}
              customerId={this.state.predict_to_send_gift.customer.id}
              isOpen={this.state.isSendingGift}
              onClose={() => { 
                this.getListPredict(this.props.matchId, this.state.page, this.state.pageSize)
                this.setState({ isSendingGift: false }) 
              }} />
          }
        </div>
      </div>
    )
  }
}

export default MatchDetail
