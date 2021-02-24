import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
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
                    {/* <div className="form-description">Đơn nhập khuyến mãi đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi quà tặng trong thời gian sớm nhất</div> */}
                    <div style={{textAlign: 'center'}}>
                        <img src={require('../../../resources/images/tree.png')}/>
                        <p>Bạn đã tiết kiệm <span>3 tấn CO2 </span> phát thải từ công trình của mình, tương đương với trồng thêm <span>20 cây xanh</span>. Hãy cùng Xi Măng INSEE giảm thiểu ô nhiễm môi trường và cùng nhau Vững Xây Cuộc Sống.</p>
                    </div>
                    <div style={{ marginTop: '100px' }} className="btn-container">
                        <button onClick={() => {
                            window.location.href = "/"
                        }} className="btn-insee btn-insee-bg">Tới trang Nhà Thầu Ngoại Hạng</button>
                    </div>
                </FormLayout>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        utility: state.utility
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportUploadBillConstructionPromotion)
