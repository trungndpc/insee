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
import { IntroConstructionForm } from '../../../common/ValidateForm'
class IntroConstructionPromotion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
            address: '',
            city: 0,
            district: 0,
            ownerName: '',
            ownerPhone: '',
            typeConstruction: 0,
            estimateTimeStart: 0,
            agreeValue: 2

        }
        this.noteRequirRef = React.createRef();
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        let constructionId = this.props.constructionId;
        if (constructionId) {
            this.props.appActions.getConstructionById(constructionId);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.app.construction && !this.props.app.construction) {
            nextState.address = nextProps.app.construction.address
            nextState.city = nextProps.app.construction.city
            nextState.district = nextProps.app.construction.district
            nextState.ownerName = nextProps.app.construction.name
            nextState.ownerPhone = nextProps.app.construction.phone
            nextState.typeConstruction = nextProps.app.construction.typeConstruction
            nextState.estimateTimeStart = nextProps.app.construction.estimateTimeStart
            nextState.agreeValue = nextProps.app.construction.extra.agree[0]
        }
        return true;
    }

    async submit() {
        try {
            await this.setState({ errorMsg: '' })
            this.props.appActions.setStatusLoading(true);

            let address = this.addressInputRef.value;
            let location = this.locationInputRef.getValues();
            let estimateTimeStart = this.dateInputRef.getValue();
            let typeConstruction = this.typeProjectInputRef.value;
            let owner = this.ownerInputRef.getValues();

            let data = {
                address: address,
                city: location.city,
                district: location.district,
                estimateTimeStart: estimateTimeStart,
                typeConstruction: typeConstruction,
                name: owner.name,
                phone: owner.phone,
                extra: { agree: [parseInt(this.noteRequirRef.current.value)] },
                promotionId: parseInt(this.props.promotionId),
                type: NEXT_CONSTRUCTION.getType()
            }
            if (IntroConstructionForm.isValid2Create(data)) {
                this.props.appActions.createNextContruction(data)
            }
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
    }

    async update() {
        try {
            await this.setState({ errorMsg: '' })
            this.props.appActions.setStatusLoading(true);

            let address = this.addressInputRef.value;
            let location = this.locationInputRef.getValues();
            let estimateTimeStart = this.dateInputRef.getValue();
            let typeConstruction = this.typeProjectInputRef.value;
            let owner = this.ownerInputRef.getValues();

            let data = {
                address: address,
                city: location.city,
                district: location.district,
                estimateTimeStart: estimateTimeStart,
                typeConstruction: typeConstruction,
                name: owner.name,
                phone: owner.phone,
                extra: { agree: [parseInt(this.noteRequirRef.current.value)] }
            }

            let construction = this.props.app.construction;
            let change = IntroConstructionForm.getChangeAndValidate(data, construction);
            if (Object.keys(change).length === 0) {
                throw 'Vui lòng cập nhật thông tin'
            }
            change.id = construction.id;
            console.log(change)
            this.props.appActions.createNextContruction(change)
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
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
                        <input ref={e => this.addressInputRef = e} onChange={(e) => this.setState({ address: e.target ? e.target.value : '' })} value={this.state.address} className="insee-input" type="text" placeholder="Địa chỉ công trình" />
                    </div>
                    <div className="form-row">
                        <LocationInput city={this.state.city} district={this.state.district} ref={e => this.locationInputRef = e} />
                    </div>
                    <div className="form-row">
                        <MDatePicker date={this.state.estimateTimeStart && new Date(this.state.estimateTimeStart * 1000)} ref={e => this.dateInputRef = e} />
                    </div>
                    <div className="form-row">
                        <select value={this.state.typeConstruction} onChange={e => this.setState({ typeConstruction: e.target.value })} ref={e => this.typeProjectInputRef = e} className="insee-input" >
                            <option value={0}>Loại hình dự án</option>
                            <option value={1}>CT A</option>
                            <option value={2}>CT B</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <OwnerInput ownerName={this.state.ownerName} ownerPhone={this.state.ownerPhone} ref={e => this.ownerInputRef = e} />
                    </div>
                    <div onClick={() => this.setState({ agreeValue: 2 })} className="form-row prelative policy">
                        <input ref={this.noteRequirRef} value={2} checked={this.state.agreeValue == 2} onChange={() => this.setState({agreeValue: 2})} name="note-customer" type="radio" />
                        <span>Tôi đồng ý cho nhân viên INSEE gọi chủ nhà để xác nhận thông tin (nhà thầu nên thông báo cho chủ nhà trước)</span>
                    </div>
                    <div onClick={() => this.setState({ agreeValue: 3 })} className="form-row prelative policy">
                        <input ref={this.noteRequirRef} value={3} checked={this.state.agreeValue == 3} onChange={() => this.setState({agreeValue: 3})} name="note-customer" type="radio" />
                        <span>Chỉ cho phép nhân viên INSEE tới kiểm tra trực tiếp tại công trình (quà tặng sẽ được gửi cho nhà thầu ngay sau khí xác nhận trực tiếp)</span>
                    </div>
                    {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}
                    <div className="btn-container">
                        {this.props.app.construction ?
                            <button onClick={this.update} className="btn-insee btn-insee-bg">Cập nhật</button>
                            :
                            <button onClick={this.submit} className="btn-insee btn-insee-bg">Xác nhận</button>
                        }
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
