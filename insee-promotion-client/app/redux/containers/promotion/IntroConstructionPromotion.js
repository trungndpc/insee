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


class IntroConstructionPromotion extends React.Component {
    constructor(props) {
        super(props)
        this.getForm = this.getForm.bind(this);
    }

    getForm() {
        let address = this.addressInputRef.value;
        let location = this.locationInputRef.getValues();
        let timeStart = this.dateInputRef.getValue();
        let typeProject = this.typeProjectInputRef.value;
        let owner = this.ownerInputRef.getValues();
        let data = {
            address: address,
            location: location,
            timeStart: timeStart,
            typeProject: typeProject,
            owner: owner
        }
        console.log(data)
    }



    render() {
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
                        <select ref={e => this.typeProjectInputRef = e}  className="insee-input" >
                            <option value={0}>Loại hình dự án</option>
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
                    <div className="btn-container">
                        <button onClick={this.getForm} className="btn-insee btn-insee-bg">Xác nhận</button>
                    </div>
                </FormLayout>
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
