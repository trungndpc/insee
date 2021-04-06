import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    useParams
} from "react-router-dom";

import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'
import LocationInput from '../../../components/promotions/LocationInput'
import StoreInput from '../../../components/promotions/StoreInput'
import Loading from '../../../components/layout/Loading'
import ImageInput from '../../../components/promotions/ImageInput'
import { NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2, TypeConstruction } from '../../../components/enum/TypeConstruction'
import { NowConstructionForm } from '../../../common/ValidateForm'
import SelectCement from '../../../components/promotions/SelectCement'
import S3 from '../../../components/S3'

import ConstructionModel from '../../../model/ConstructionModel'
import PromotionModel from '../../../model/PromotionModel'
import * as Error from '../../../common/Error'
import ValueBillInput from '../../../components/promotions/ValueBillInput';

class FormUpload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
            address: '',
            city: 0,
            district: 0,
            storeName: '',
            storePhone: '',
            quantity: 0,
            countImg: 0,
            countBill: 0,
            cement: null
        }

        this._getForm = this._getForm.bind(this)
        this._getPromotion = this._getPromotion.bind(this)
        this._getConstruction = this._getConstruction.bind(this)
        this._addOrUpdate = this._addOrUpdate.bind(this)
        this._submit = this._submit.bind(this)
        this._update = this._update.bind(this)
    }

    componentDidMount() {
        this._getPromotion()
        this._getConstruction()
    }

    _getForm() {
        const  promotion = this.state.promotion;
        const type = promotion && TypeConstruction.findByType(promotion.typePromotion)

        let location = this.locationInputRef.getValues();
        let store = this.storeInputRef.getValues();
        let agree = this.agreeRef.checked;
        let data = {
            address: this.addressInputRef.value,
            city: location.city,
            district: location.district,
            name: store.name,
            phone: store.phone,
            extra: agree ? { agree: [1] } : {},
            promotionId: parseInt(this.props.promotionId),
            type: type.getType()
        }

        if (type == NOW_CONSTRUCTION) {
            let cement = this.state.promotion.ruleAcceptedCement[0];
            if (this.typeCementRef) {
                data.cement = this.typeCementRef.getValue();
            }else {
                data.cement = cement
            }
            data.quantity = this.quantityInputRef && this.quantityInputRef.value
        } else {
            data.valueBill = this.valueBillInputRef && this.valueBillInputRef.getValue()
        }
        console.log(data)
        return data;
    }

    _getPromotion() {
        if (this.props.promotionId) {
            PromotionModel.get(this.props.promotionId)
                .then(resp => {
                    this.setState({ promotion: resp.data })
                })
                .catch(err => {
                    //ERROR 
                })
        }
    }

    _getConstruction() {
        if (this.props.constructionId) {
            ConstructionModel.get(this.props.constructionId)
                .then(resp => {
                    const construction = resp.data;
                    this.setState({
                        construction: construction,
                        address: construction.address,
                        city: construction.city,
                        district: construction.district,
                        storeName: construction.name,
                        storePhone: construction.phone,
                        quantity: construction.quantity,
                        valueBill: construction.valueBill,
                        countBill: construction.bills.length,
                        countImg: construction.images.length,
                        cement: construction.cement
                    })
                })
                .catch(err => {
                    //ERROR 
                })
        }
    }

    _addOrUpdate(data) {
        ConstructionModel.addOrUpdate(data)
            .then((res) => {
                this.props.appActions.setStatusLoading(false);
                if (res.error == Error.COMMON.SUCCESS) {
                    const id = res.data.id;
                    window.pushHistory(`/khuyen-mai/up-hoa-don-nha-qua/${id}`)
                } else {
                    this.setState({ errorMsg: '' })
                }
            })
            .catch((err) => {
                this.props.appActions.setStatusLoading(false);
                this.setState({ errorMsg: '' })
            })
    }

    async _submit() {
        try {
            const promotion = this.state.promotion
            let data = this._getForm()
            this.props.appActions.setStatusLoading(true);
            if (NowConstructionForm.isValid2Create(data, promotion)) {
                let billFiles = this.billInputRef.getValue();
                let imageFiles = this.imageInputRef.getValue();
                if (NowConstructionForm.isValidBill(billFiles)
                    && NowConstructionForm.isValidImg(imageFiles)) {
                    let listBill = await this.s3.upload(billFiles);
                    let listImg = await this.s3.upload(imageFiles);
                    data.billIds = listBill;
                    data.imageIds = listImg;
                    this._addOrUpdate(data);
                }
            }
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
    }

    async _update() {
        try {
            let construction = this.state.construction;
            let promotion = this.state.promotion;
            let data = this._getForm()
            this.props.appActions.setStatusLoading(true);
            let change = NowConstructionForm.getChangeAndValidate(data, construction, promotion);
            let billFiles = this.billInputRef.getValue()
            let imageFiles = this.imageInputRef.getValue()

            if (Object.keys(change).length === 0
                && (!billFiles || billFiles.length == 0)
                && (!imageFiles || imageFiles.length == 0)) {
                throw 'Vui lòng cập nhật thông tin'
            }

            if (billFiles && billFiles.length != 0
                && NowConstructionForm.isValidBill(billFiles)) {
                change.billIds = await this.s3.upload(billFiles)
            }

            if (imageFiles && imageFiles.length != 0
                && NowConstructionForm.isValidImg(imageFiles)) {
                data.imageIds = await this.s3.upload(imageFiles)
            }
            this._addOrUpdate(change)
        } catch (e) {
            this.props.appActions.setStatusLoading(false);
            this.setState({ errorMsg: e })
        }
    }

    render() {
        const promotion = this.state.promotion
        const type = promotion && TypeConstruction.findByType(promotion.typePromotion)
        return (
            <div>
                <FormLayout {...this.props}>
                    <span className="contact100-form-title">
                        {promotion && promotion.title}
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
                        <StoreInput storeName={this.state.storeName} storePhone={this.state.storePhone} ref={e => this.storeInputRef = e} />
                    </div>
                    <div className="form-row select-cement">
                        {promotion && type == NOW_CONSTRUCTION && promotion.ruleAcceptedCement && promotion.ruleAcceptedCement.length > 1 &&
                            <SelectCement value={this.state.cement} ref={e => this.typeCementRef = e} options={promotion.ruleAcceptedCement} />
                        }
                    </div>
                    {type == NOW_CONSTRUCTION_V2 &&
                        <div className="form-row">
                            <ValueBillInput ref={e => this.valueBillInputRef = e} value={this.state.valueBill} rule={promotion && promotion.ruleValueBill}/>
                            {/* <input value={this.state.valueBill != 0 && this.state.valueBill} onChange={e => this.setState({ valueBill: e.target.value })} ref={e => this.valueBillInputRef = e} className="insee-input" type="number" placeholder="Giá trị hóa đơn (nghìn đồng)" /> */}
                            {/* {promotion && this.state.valueBill != 0 && this.state.valueBill < promotion.ruleValueBill && <p className="err-slsp">Vui lòng nhập giá trị hóa đơn tối thiểu {promotion.ruleValueBill} nghìn đồng</p>} */}
                        </div>
                    }
                    {type == NOW_CONSTRUCTION &&
                        <div className="form-row">
                            <input value={this.state.quantity != 0 && this.state.quantity} onChange={e => this.setState({ quantity: e.target.value })} ref={e => this.quantityInputRef = e} className="insee-input" type="number" placeholder="Số lượng sản phẩm dùng cho công trình" />
                            {promotion && this.state.quantity != 0 && this.state.quantity < promotion.ruleQuantily && <p className="err-slsp">Vui lòng nhập số lượng sản phẩm lớn hơn yêu cầu là {promotion.ruleQuantily}</p>}
                        </div>
                    }
                    <S3 ref={e => this.s3 = e}>
                        <div className="form-row">
                            <ImageInput value={this.state.countBill != 0 ? `${this.state.countBill} hóa đơn đã upload, bấm vào đây để upload thêm` : null} placeholder={'Hình ảnh hóa đơn/đơn hàng đã mua'} ref={e => this.billInputRef = e} />
                            <p className="desc-bill">Lưu ý: Tổng số lượng trên hàng hóa bằng tổng số lượng sản phẩm đã nhập</p>
                        </div>
                        <div className="form-row">
                            <ImageInput value={this.state.countImg != 0 ? `${this.state.countImg} hình ảnh đã upload, bấm vào đây để upload thêm` : null} placeholder={'Hình ảnh công trình có bao xi măng INSEE'} ref={e => this.imageInputRef = e} />
                        </div>
                    </S3>
                    <div className="form-row prelative policy">
                        <input ref={e => this.agreeRef = e} defaultChecked={true} type="checkbox" />
                        <span>Tôi đồng ý cho nhân viên INSEE có thể tới công trình kiểm tra ngẫu nhiên</span>
                    </div>

                    {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}

                    <div className="btn-container">
                        {this.state.construction ?
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
    return <FormUpload promotionId={promotionId} constructionId={constructionId} {...props} />
})

