import React from 'react'
import FormLayout from '../../../components/layout/FormLayout'
import ConstructionModel from '../../../model/ConstructionModel'
import {
    useParams
} from "react-router-dom";
import * as Error from '../../../common/Error'

class DetailUploadBillPromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            co2: 0,
            tree: 0,
            isCalling: true
        }
        this._getSummary = this._getSummary.bind(this)
        this.isShowCO2Message = this.isShowCO2Message.bind(this)
    }

    componentDidMount() {
        this._getSummary()
    }

    _getSummary() {
        const constructionId = this.props.constructionId;
        ConstructionModel.getSummary(constructionId)
            .then(resp => {
                if (resp.error == Error.COMMON.SUCCESS) {
                    let reduce = resp.data.reduce;
                    let tree = resp.data.tree;
                    this.setState({ co2: reduce, tree: tree, isCalling: false })
                } else {
                    this.setState({ isCalling: false })
                    console.log(resp)
                }
            })
            .catch(err => {
                this.setState({ isCalling: false })
                console.error(err)
            })
    }

    _changeUnit(kg) {
        if (kg >= 1000) {
            let ton = parseInt(kg / 1000);
            if (ton * 1000 == kg) {
                return `${ton} tấn C02`
            } else {
                let odd = kg - ton * 1000
                return `${ton} tấn ${odd} kg CO2`
            }
        } else {
            return `${kg} kg CO2`
        }
    }

    isShowCO2Message() {
        return this.state.co2 > 0 && this.state.tree > 0;
    }

    render() {
        const isSHOWCO2 = this.isShowCO2Message()
        const msgCO2 = this.state.co2 > 0 && this._changeUnit(this.state.co2)
        const tree = this.state.tree > 0 && this.state.tree
        return (
            <div>
                <FormLayout {...this.props}>
                    <span className="contact100-form-title">
                        Hoàn tất
                    <div className="line-bt" />
                    </span>
                    {!this.state.isCalling && isSHOWCO2 && <h3 className="say-thank">Cảm ơn anh!</h3>}
                    {!this.state.isCalling && isSHOWCO2 &&
                        <p className="desc-sthk">Đã tiết kiệm <span className="red">{msgCO2}</span> tương đương trồng thêm <span className="green">{tree} cây xanh</span> từ việc sử dụng Xi Măng INSEE!</p>
                    }
                    {!this.state.isCalling && !isSHOWCO2 &&
                        <div className="form-description">Đơn nhập khuyến mãi đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi quà tặng trong thời gian sớm nhất</div>
                    }
                    {!this.state.isCalling && isSHOWCO2 &&
                        <div className="icon-sthk">
                            <img src={require('../../../resources/images/co2.png')} />
                        </div>
                    }
                    {!this.state.isCalling && isSHOWCO2 && 
                        <p className="desc-sthk">Cùng Xi Măng INSEE giảm ô nhiễm môi trường trên hành trình Vững Xây Cuộc Sống!</p>
                    }
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

export default (props) => {
    let { constructionId } = useParams();
    return <DetailUploadBillPromotion constructionId={constructionId} {...props} />
}




