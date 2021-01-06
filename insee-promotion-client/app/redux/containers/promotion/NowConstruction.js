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
import {NOW_CONSTRUCTION} from '../../../components/enum/TypeConstruction'
const BILL_FOLDER = "bill"
const IMAGE_INSEE_FOLDER = "img-insee"
class NowConstruction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.submit = this.submit.bind(this)
        this.uploadBill = this.uploadBill.bind(this)
    }


    uploadBill() {
        var uid = 25;
        var fileList = this.billInputRef.getValue();
        if (!fileList || fileList.length < 0) {
            return Promise.reject('Vui chọn hóa đơn đã mua');
        }
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

    uploadImgInsee() {
        var uid = 25;
        var fileList = this.imageInputRef.getValue();
        if (!fileList || fileList.length < 0) {
            return Promise.reject('Vui lòng chọn hình ảnh có xi măng INSEE');
        }
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
            let address = this.addressInputRef.value;
            let location = this.locationInputRef.getValues();
            let store = this.storeInputRef.getValues();
            let quantity = this.quantityInputRef.value;
            if (!address) {
                this.setState({ errorMsg: 'Vui lòng nhập địa chỉ công trình' })
                return;
            }
            let city = location && location["city"];
            if (!city || city <= 0) {
                this.setState({ errorMsg: 'Vui lòng nhập tỉnh' })
                return;
            }
            let district = location && location["district"];
            if (!district || district <= 0) {
                this.setState({ errorMsg: 'Vui lòng nhập quận' })

                return;
            }
            let storeName = store && store["name"];
            if (!storeName) {
                this.setState({ errorMsg: 'Vui lòng nhập tên cửa hàng' })

                return;
            }
            let storePhone = store && store["phone"];
            if (!storePhone) {
                this.setState({ errorMsg: 'Vui lòng nhập số điện thoại cửa hàng' })
                return;
            }
            if (!quantity) {
                this.setState({ errorMsg: 'Vui lòng nhập số lượng bao xi măng' })
                return;
            }
            this.props.appActions.setStatusLoading(true);
            let listBill = await this.uploadBill();
            let listImg = await this.uploadImgInsee();

            let data = {
                address: address,
                city: city,
                district: district,
                name: storeName,
                phone: storePhone,
                quantity: quantity,
                billIds: listBill,
                imageIds: listImg,
                type: NOW_CONSTRUCTION.getType()
            }
            this.props.appActions.createNextContruction(data)
        } catch (e) {
            this.setState({ errorMsg: e })
            this.props.appActions.setStatusLoading(false);
        }

    }


    render() {
        const contruction = this.props.app.contruction;
        if (contruction) {
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
                        <input ref={e => this.addressInputRef = e} className="insee-input" type="text" placeholder="Địa chỉ công trình" />
                    </div>
                    <div className="form-row">
                        <LocationInput ref={e => this.locationInputRef = e} />
                    </div>
                    <div className="form-row">
                        <StoreInput ref={e => this.storeInputRef = e} />
                    </div>
                    <div className="form-row">
                        <input ref={e => this.quantityInputRef = e} className="insee-input" type="number" placeholder="Số lượng sản phẩm dùng cho công trình" />
                    </div>
                    <div className="form-row">
                        <ImageInput placeholder={'Hình ảnh hóa đơn/đơn hàng đã mua'} ref={e => this.billInputRef = e} />
                        <p className="desc-bill">Lưu ý: Tổng số lượng trên hàng hóa bằng tổng số lượng sản phẩm đã nhập</p>
                    </div>
                    <div className="form-row">
                        <ImageInput placeholder={'Hình ảnh công trình có bao xi măng INSEE'} ref={e => this.imageInputRef = e} />
                    </div>

                    <div className="form-row prelative policy">
                        <input checked type="checkbox" />
                        <span>Tôi đồng ý cho nhân viên INSEE có thể tới công trình kiểm tra ngẫu nhiên</span>
                    </div>

                    {this.state.errorMsg && <div className="msg-error"><span>*** {this.state.errorMsg}</span></div>}

                    <div className="btn-container">
                        <button onClick={this.submit} className="btn-insee btn-insee-bg">Xác nhận</button>
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
