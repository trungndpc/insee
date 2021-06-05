import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    useParams
} from "react-router-dom";

import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'
import LocationInput from '../../../components/promotions/LocationInput'
import OwnerInput from '../../../components/promotions/OwnerInput'
import Project from '../../../data/Project'


import MDatePicker from '../../../components/promotions/MDatePicker'
import Loading from '../../../components/layout/Loading'
import { NEXT_CONSTRUCTION } from '../../../components/enum/TypeConstruction'
import { IntroConstructionForm } from '../../../common/ValidateForm'
import ConstructionModel from '../../../model/ConstructionModel'
import PromotionModel from '../../../model/PromotionModel'
import * as Error from '../../../common/Error'


class Form extends React.Component {
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
        this._getConstruction = this._getConstruction.bind(this)
        this._getForm = this._getForm.bind(this)
        this._addOrUpdate = this._addOrUpdate.bind(this)
        this._submit = this._submit.bind(this)
        this._update = this._update.bind(this)

    }

    componentDidMount() {
        this._getConstruction()
    }

    _getConstruction() {
        if (this.props.constructionId) {
            ConstructionModel.get(this.props.constructionId)
                .then(resp => {
                    if (resp.error == Error.COMMON.SUCCESS) {
                        const construction = resp.data;
                        console.log(construction)
                        this.setState({
                            construction: construction,
                            address: construction.address,
                            city: construction.city,
                            district: construction.district,
                            ownerName: construction.name,
                            ownerPhone: construction.phone,
                            typeConstruction: construction.typeConstruction,
                            estimateTimeStart: construction.estimateTimeStart,
                            agreeValue: extra.agree[0]
                        })
                        console.log(this.state)
                    } else {

                    }
                })
                .catch(err => {
                    //ERROR 
                })
        }
    }

    _getForm() {
        let address = this.addressInputRef.value;
        let location = this.locationInputRef.getValues();
        let estimateTimeStart = this.dateInputRef.getValue();
        let typeConstruction = this.typeProjectInputRef.value;
        let owner = this.ownerInputRef.getValues();

        return {
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
    }

    _addOrUpdate(data) {
        ConstructionModel.addOrUpdate(data)
            .then((res) => {
                console.log(res)
                if (res.error == Error.COMMON.SUCCESS) {
                    const id = res.data.id;
                    window.pushHistory(`/khuyen-mai/cong-trinh-tiep-theo/${id}`)
                } else {
                    this.setState({ errorMsg: '' })
                }
            })
            .catch((err) => {
                this.setState({ errorMsg: '' })
            })
    }

    async _submit() {
        try {
            await this.setState({ errorMsg: '' })
            this.props.appActions.setStatusLoading(true);
            let data = this._getForm()
            if (IntroConstructionForm.isValid2Create(data)) {
                this._addOrUpdate(data)
            }
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
    }

    async _update() {
        try {
            await this.setState({ errorMsg: '' })
            this.props.appActions.setStatusLoading(true);
            let data = this._getForm()

            let construction = this.props.app.construction;
            let change = IntroConstructionForm.getChangeAndValidate(data, construction);
            if (Object.keys(change).length === 0) {
                throw 'Vui lòng cập nhật thông tin'
            }
            change.id = construction.id;
            this._addOrUpdate(change)
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
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
                            {Project.getList().map((item, index) => {
                                return <option key={item.key} value={item.key}>{item.value}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-row">
                        <OwnerInput ownerName={this.state.ownerName} ownerPhone={this.state.ownerPhone} ref={e => this.ownerInputRef = e} />
                    </div>
                    <div onClick={() => this.setState({ agreeValue: 2 })} className="form-row prelative policy">
                        <input ref={this.noteRequirRef} value={2} checked={this.state.agreeValue == 2} onChange={() => this.setState({ agreeValue: 2 })} name="note-customer" type="radio" />
                        <span>Tôi đồng ý cho nhân viên INSEE gọi chủ nhà để xác nhận thông tin (nhà thầu nên thông báo cho chủ nhà trước)</span>
                    </div>
                    <div onClick={() => this.setState({ agreeValue: 3 })} className="form-row prelative policy">
                        <input ref={this.noteRequirRef} value={3} checked={this.state.agreeValue == 3} onChange={() => this.setState({ agreeValue: 3 })} name="note-customer" type="radio" />
                        <span>Chỉ cho phép nhân viên INSEE tới kiểm tra trực tiếp tại công trình (quà tặng sẽ được gửi cho nhà thầu ngay sau khí xác nhận trực tiếp)</span>
                    </div>
                    {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}
                    <div className="btn-container">
                        {this.props.app.construction ?
                            <button onClick={this._update} className="btn-insee btn-insee-bg">Cập nhật</button>
                            :
                            <button onClick={this._submit} className="btn-insee btn-insee-bg">Xác nhận</button>
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
)((props) => {
    let { promotionId, constructionId } = useParams();
    return <Form promotionId={promotionId} constructionId={constructionId} {...props} />
})


