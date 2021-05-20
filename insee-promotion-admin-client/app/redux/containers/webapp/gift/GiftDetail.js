import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import GiftModel from '../../../../model/GiftModel';
import { WAITING_RECEIVE } from '../../../../components/enum/GiftStatus'
import AlertUtils from '../../../../utils/AlertUtils'

class GiftDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gift: null,
      isAreYouSureModal: false
    }
    this.load = this.load.bind(this)
    this.send = this.send.bind(this)
  }

  load(id) {
    GiftModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ gift: resp.data })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  send(id) {
    GiftModel.updateStatus(id, WAITING_RECEIVE.getStatus())
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess("Thành công");
          this.load(id)
        }
      })
  }




  render() {

    return (
      <div className="loadMore">
        <div className="m-content">
          <div className="central-meta">
            <div className="about">
              <div className="personal">
                <h5 className="f-title">Voucher 500 Bánh Hóa Xanh</h5>
              </div>
              <table className="table table-responsive table-info-contractor">
                <tbody>
                  <tr>
                    <th>Thầu</th>
                    <td>Anh Trung</td>
                  </tr>
                  <tr>
                    <th>Số điện thoại</th>
                    <td>0972797184</td>
                  </tr>
                  <tr>
                    <th>Trang thái</th>
                    <td>Chờ gửi</td>
                  </tr>
                  <tr>
                    <th>Thời gian tạo</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Thời gian cập nhật</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={this.send} onClose={() => { this.setState({ isAreYouSureModal: false }) }} />
      </div>
    )
  }
}

export default GiftDetail
