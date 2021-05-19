import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";

class GiftDetail extends Component {

  constructor(props) {
    super(props)
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
      </div>
    )
  }
}

export default GiftDetail
