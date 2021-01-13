import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'
import LocationInput from '../../../components/promotions/LocationInput'
import OwnerInput from '../../../components/promotions/OwnerInput'

import '../../../resources/css/mobile/bootstrap.min.css';
import '../../../resources/css/mobile/main.css';
import '../../../resources/css/mobile/me.css';
import MDatePicker from '../../../components/promotions/MDatePicker'
import SuccessCreateContruction from '../../../components/promotions/SuccessCreateContruction'
import Loading from '../../../components/layout/Loading'
import { NEXT_CONSTRUCTION } from '../../../components/enum/TypeConstruction'
class IntroConstructionPromotion extends React.Component {
    constructor(props) {
        super(props)
        this.getForm = this.getForm.bind(this);
        this.state = {
            errorMsg: null
        }
    }

    getForm() {
        let address = this.addressInputRef.value;
        let location = this.locationInputRef.getValues();
        let estimateTimeStart = this.dateInputRef.getValue();
        let typeConstruction = this.typeProjectInputRef.value;
        let owner = this.ownerInputRef.getValues();

        if (!address) {
            this.setState({ errorMsg: "Vui lòng nhập địa chỉ" })
            return;
        }
        let city = location && location.city;
        if (!city || city == 0) {
            this.setState({ errorMsg: "Vui lòng chọn tỉnh thành" })
            return;
        }
        let district = location && location.district;
        if (!district || district == 0) {
            this.setState({ errorMsg: "Vui lòng chọn quận/huyện" })
            return;
        }
        if (typeConstruction == 0) {
            this.setState({ errorMsg: "Vui lòng chọn loại công trình" })
            return;
        }
        if (!estimateTimeStart) {
            this.setState({ errorMsg: "Vui lòng ước tính thời gian khởi công" })
            return;
        }
        let name = owner && owner.name;
        if (!name) {
            this.setState({ errorMsg: "Vui lòng nhập tên" })
            return;
        }
        let phone = owner && owner.phone;
        if (!phone) {
            this.setState({ errorMsg: "Vui lòng nhập số điện thoại" })
            return;
        }

        let data = {
            address: address,
            city: city,
            district: district,
            estimateTimeStart: estimateTimeStart,
            typeConstruction: typeConstruction,
            name: name,
            phone: phone,
            promotionId: parseInt(this.props.promotionId),
            type: NEXT_CONSTRUCTION.getType()
        }
        this.props.appActions.createNextContruction(data)
    }



    render() {
        const crateedContruction = this.props.app.crateedContruction;
        if (crateedContruction) {
            return <SuccessCreateContruction />
        }
        return (
            <div>
                <FormLayout {...this.props}>
                    <span className="contact100-form-title">
                        Chương trình giới thiệu công trình tiếp theo của tôi
                     <div className="line-bt" />
                    </span>
                    <div className="form-description">Vui lòng nhập thông tin để hoàn tất</div>
                    <div className="form-row">
                        <input ref={e => this.addressInputRef = e} className="insee-input" type="text" placeholder="Địa chỉ công trình" />
                    </div>
                    <div className="form-row">
                        <LocationInput ref={e => this.locationInputRef = e} />
                    </div>
                    <div className="form-row">
                        <MDatePicker ref={e => this.dateInputRef = e} />
                    </div>
                    <div className="form-row">
                        <select ref={e => this.typeProjectInputRef = e} className="insee-input" >
                            <option value={0}>Loại hình dự án</option>
                            <option value={1}>CT A</option>
                            <option value={2}>CT B</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <OwnerInput ref={e => this.ownerInputRef = e} />
                    </div>
                    <div className="form-row prelative policy">
                        <input checked type="checkbox" />
                        <span>Tôi đồng ý cho nhân viên INSEE gọi chủ nhà để xác nhận thông tin (nhà thầu nên thông báo cho chủ nhà trước)</span>
                    </div>
                    <div className="form-row prelative policy">
                        <input checked type="checkbox" />
                        <span>Chỉ cho phép nhân viên INSEE tới kiểm tra trực tiếp tại công trình (quà tặng sẽ được gửi cho nhà thầu ngay sau khí xác nhận trực tiếp)</span>
                    </div>
                    {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}
                    <div className="btn-container">
                        <button onClick={this.getForm} className="btn-insee btn-insee-bg">Xác nhận</button>
                    </div>
                </FormLayout>
                <Loading {...this.props} />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
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
)(IntroConstructionPromotion)
