import React, { Component } from 'react'
import FormLayout from '../layout/FormLayout'
class SuccessCreateContruction extends Component {


  render() {
    return (
      <div>
        <FormLayout {...this.props}>
          <span className="contact100-form-title">
            Hoàn tất
            <div className="line-bt" />
          </span>
          <div className="form-description">Đơn nhập khuyến mãi đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi quà tặng trong thời gian sớm nhất</div>
          <div style={{marginTop: '100px'}} className="btn-container">
            <button onClick={() => {
              window.location.href = "/"
            }} className="btn-insee btn-insee-bg">Tới trang Nhà Thầu Ngoại Hạng</button>
          </div>
        </FormLayout>
      </div>
    )
  }
}

export default SuccessCreateContruction
