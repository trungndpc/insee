import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'
import LocationInput from '../../../components/promotions/LocationInput'
import StoreInput from '../../../components/promotions/StoreInput'
import '../../../resources/css/mobile/bootstrap.min.css';
import '../../../resources/css/mobile/main.css';
import '../../../resources/css/mobile/me.css';
import Loading from '../../../components/layout/Loading'
import ImageInput from '../../../components/promotions/ImageInput'
import S3Util from '../../../utils/S3Util'
import { NOW_CONSTRUCTION } from '../../../components/enum/TypeConstruction'
import SuccessCreateContruction from '../../../components/promotions/SuccessCreateContruction'
import { NowConstructionForm } from '../../../common/ValidateForm'
const BILL_FOLDER = "bill"
const IMAGE_INSEE_FOLDER = "img-insee"
class NowConstruction extends React.Component {

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
            countBill: 0
        }
        this.submit = this.submit.bind(this)
        this.uploadBill = this.uploadBill.bind(this)
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
            nextState.storeName = nextProps.app.construction.name
            nextState.storePhone = nextProps.app.construction.phone
            nextState.quantity = nextProps.app.construction.quantity
            nextState.countBill = nextProps.app.construction.bills.length
            nextState.countImg = nextProps.app.construction.images.length
        }
        return true;
    }

    uploadBill(fileList) {
        var uid = 25;
        return new Promise((resolve, reject) => {
            S3Util.createAlbum(BILL_FOLDER, uid + "", (pathFolder) => {
                let name = new Date().getTime();
                let promoise = S3Util.addPhotos(pathFolder, fileList, name);
                promoise.then(values => {
                    resolve(values.map(value => value.Location))
                }).catch(e => {
                    reject('Đã có lỗi xảy ra trong quá trình upload hình ảnh');
                })
            });
        });
    }

    uploadImgInsee(fileList) {
        var uid = 25;
        return new Promise((resolve, reject) => {
            S3Util.createAlbum(IMAGE_INSEE_FOLDER, uid + "", (pathFolder) => {
                let name = new Date().getTime();
                let promoise = S3Util.addPhotos(pathFolder, fileList, name);
                promoise.then(values => {
                    resolve(values.map(value => value.Location))
                }).catch(e => {
                    reject('Đã có lỗi xảy ra trong quá trình upload hình ảnh');
                })
            });
        });
    }

    async submit() {
        try {
            await this.setState({ errorMsg: '' })
            this.props.appActions.setStatusLoading(true);
            let location = this.locationInputRef.getValues();
            let store = this.storeInputRef.getValues();
            let agree = this.agreeRef.checked;
            let data = {
                address: this.addressInputRef.value,
                city: location.city,
                district: location.district,
                name: store.name,
                phone: store.phone,
                quantity: this.quantityInputRef.value,
                extra: agree ? { agree: [1] } : {},
                promotionId: parseInt(this.props.promotionId),
                type: NOW_CONSTRUCTION.getType()
            }
            if (NowConstructionForm.isValid2Create(data)) {
                let billFiles = this.billInputRef.getValue();
                let imageFiles = this.imageInputRef.getValue();
                if (NowConstructionForm.isValidBill(billFiles)
                    && NowConstructionForm.isValidImg(imageFiles)) {
                    let listBill = await this.uploadBill(billFiles);
                    let listImg = await this.uploadImgInsee(imageFiles);
                    data.billIds = listBill;
                    data.imageIds = listImg;
                    console.log(data)
                    this.props.appActions.createNextContruction(data)
                }
            }
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }
    }

    async update() {
        try {
            await this.setState({ errorMsg: '' })
            let construction = this.props.app.construction;
            this.props.appActions.setStatusLoading(true);
            let location = this.locationInputRef.getValues();
            let store = this.storeInputRef.getValues();
            let agree = this.agreeRef.checked;
            let data = {
                address: this.addressInputRef.value,
                city: location.city,
                district: location.district,
                name: store.name,
                phone: store.phone,
                quantity: this.quantityInputRef.value,
                extra: agree ? { agree: [1] } : {}
            }
            let change = NowConstructionForm.getChangeAndValidate(data, construction);
            let billFiles = this.billInputRef.getValue();
            let imageFiles = this.imageInputRef.getValue();
            if (Object.keys(change).length === 0 && (!billFiles || billFiles.length == 0) && (!imageFiles || imageFiles.length == 0)) {
                throw 'Vui lòng cập nhật thông tin'
            }
            if (billFiles && billFiles.length != 0 && NowConstructionForm.isValidBill(billFiles)) {
                let listBill = await this.uploadBill(billFiles);
                change.billIds = listBill;
            }

            if (imageFiles && imageFiles.length != 0 && NowConstructionForm.isValidImg(imageFiles)) {
                let listImg = await this.uploadImgInsee(imageFiles);
                data.imageIds = listImg;
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
                        Chương trình khuyến mãi INSEE Wall Pro
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
                    <div className="form-row">
                        <input value={this.state.quantity} onChange={e => this.setState({ quantity: e.target.value })} ref={e => this.quantityInputRef = e} className="insee-input" type="number" placeholder="Số lượng sản phẩm dùng cho công trình" />
                    </div>
                    <div className="form-row">
                        <ImageInput value={this.state.countBill != 0 ? `${this.state.countBill} hóa đơn đã upload, bấm vào đây để upload thêm` : null} placeholder={'Hình ảnh hóa đơn/đơn hàng đã mua'} ref={e => this.billInputRef = e} />
                        <p className="desc-bill">Lưu ý: Tổng số lượng trên hàng hóa bằng tổng số lượng sản phẩm đã nhập</p>
                    </div>
                    <div className="form-row">
                        <ImageInput value={this.state.countImg != 0 ? `${this.state.countImg} hình ảnh đã upload, bấm vào đây để upload thêm` : null} placeholder={'Hình ảnh công trình có bao xi măng INSEE'} ref={e => this.imageInputRef = e} />
                    </div>

                    <div className="form-row prelative policy">
                        <input ref={e => this.agreeRef = e} defaultChecked={true} type="checkbox" />
                        <span>Tôi đồng ý cho nhân viên INSEE có thể tới công trình kiểm tra ngẫu nhiên</span>
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
)(NowConstruction)
