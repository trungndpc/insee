import React from 'react'
import FormLayout from '../../../components/layout/FormLayout'

class ReportUploadBillConstructionPromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <FormLayout {...this.props}>
                    <span className="contact100-form-title">
                        Hoàn tất
                    <div className="line-bt" />
                    </span>
                    <h3 className="say-thank">Cảm ơn anh!</h3>
                    <p className="desc-sthk">Đã tiết kiệm <span className="red">3 tấn CO2</span> tương đương trồng thêm <span className="green">20 cây xanh</span> từ việc sử dụng Xi Măng INSEE!</p>
                    {/* <div className="form-description">Đơn nhập khuyến mãi đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi quà tặng trong thời gian sớm nhất</div> */}
                    <div className="icon-sthk">
                        <img src={require('../../../resources/images/co2.png')} />
                    </div>
                    <p className="desc-sthk">Cùng Xi Măng INSEE giảm ô nhiễm môi trường trên hành trình Vững Xây Cuộc Sống!</p>
                    <div style={{ marginTop: '50px' }} className="btn-container">
                        <button onClick={() => {
                            window.location.href = "/"
                        }} className="btn-insee btn-insee-bg">Tới trang Nhà Thầu Ngoại Hạng</button>
                    </div>
                </FormLayout>
            </div>
        )
    }
}

export default ReportUploadBillConstructionPromotion

