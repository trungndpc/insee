import React, { Component } from 'react'
import { TypeConstruction, NOW_CONSTRUCTION, NEXT_CONSTRUCTION, NOW_CONSTRUCTION_V2 } from '../enum/TypeConstruction'
import INSEEEditor from './INSEEEditor'
import DateTimeUtil from '../../utils/DateTimeUtil'
import AreYouSureModal from '../../components/modal/AreYouSureModal'
import InputImage from '../InputImage'
import S3Util from '../../utils/S3Util'
import CementMultiSelect from '../post/CementMultiSelect'
import LocationMultiSelect from '../post/LocationMultiSelect'
import { TypeGift, CARD_PHONE } from '../enum/TypeGift'
const FOLDER_COVER_S3 = 'static/images/cover';


class CreatePromotion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'Hello from TrungND',
            errorMsg: null,
            isAreYouSureModal: false,
            typePromotion: NOW_CONSTRUCTION,
            typeGift: CARD_PHONE
        }
        this._onClickSave = this._onClickSave.bind(this)
        this._onClickPublic = this._onClickPublic.bind(this)
        this._onClosePublicModal = this._onClosePublicModal.bind(this)
        this.onPublicPost = this.onPublicPost.bind(this)
        this._onChangeTypePromotion = this._onChangeTypePromotion.bind(this)
        this._onChangeTypeGift = this._onChangeTypeGift.bind(this)
    }

    componentDidMount() {
        this.props.appActions.clearPromotionData()
        let postId = this.props.postId;
        if (postId) {
            this.props.appActions.getPromotionById(postId);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.app.promotion != this.props.app.promotion) {
            if (nextProps.app.promotion) {
                nextState.typePromotion = TypeConstruction.findByType(nextProps.app.promotion.typePromotion)
            }
        }
        return true;
    }

    _onClickPublic() {
        this.setState({ isAreYouSureModal: true })
    }

    _onClosePublicModal() {
        this.setState({ isAreYouSureModal: false })
    }

    _onChangeTypePromotion(e) {
        let type = parseInt(e.target.value);
        this.setState({
            typePromotion: TypeConstruction.findByType(type)
        })
    }

    _onChangeTypeGift(e) {
        let type = parseInt(e.target.value);
        this.setState({
            typeGift: TypeGift.findById(type)
        })
    }

    onPublicPost() {
        this.props.appActions.updateStatusPromotion(this.props.postId)
    }

    async _onClickSave() {
        let title = this.titleInputRef.value;
        let summary = this.summaryInputRef.value;
        let location = this.locationRef.getValue();
        let timeStart = this.timeStartInputRef.value;
        let timeEnd = this.timeEndInputRef.value;
        let content = this.editorRef.getValue();


        if (!title) {
            this.setState({ errorMsg: 'Vui lòng nhập tiêu đề' })
            return;
        }
        if (!summary) {
            this.setState({ errorMsg: 'Vui lòng nhập tóm tắt' })
            return;
        }

        if (!content) {
            this.setState({ errorMsg: 'Vui lòng nhập nội dung' })
            return;
        }

        if (!location) {
            this.setState({ errorMsg: 'Vui lòng chọn khu vực áp dụng' })
            return;
        }

        if (!timeStart) {
            this.setState({ errorMsg: 'Vui lòng chọn thời gian áp dụng' })
            return;
        }

        if (!timeEnd) {
            this.setState({ errorMsg: 'Vui lòng chọn thời gian kết thúc' })
            return;
        }

        let data = {
            title: title,
            summary: summary,
            content: content,
            typePromotion: this.state.typePromotion.getType(),
            typeGift: this.state.typeGift.getType(),
            location: location,
            timeStart: new Date(timeStart).getTime() / 1000,
            timeEnd: new Date(timeEnd).getTime() / 1000,
        }

        if (this.state.typePromotion == NOW_CONSTRUCTION) {
            let ruleQuantily = this.ruleQuantilyInputRef.value;
            let ruleAcceptedCement = this.cementRef.getValue();

            if (!ruleQuantily || ruleQuantily == 0) {
                this.setState({ errorMsg: 'Vui lòng nhập số lượng sản phẩm tối thiểu' })
                return;
            }

            if (!ruleAcceptedCement || ruleAcceptedCement.length == 0) {
                this.setState({ errorMsg: 'Vui lòng chọn loại xi măng' })
                return;
            }

            data.ruleQuantily = ruleQuantily;
            data.ruleAcceptedCement = ruleAcceptedCement;

        }

        if (this.state.typePromotion == NOW_CONSTRUCTION_V2) {
            let ruleValueBill = this.ruleValueBillInputRef.value;
            if (!ruleValueBill || ruleValueBill == 0) {
                this.setState({ errorMsg: 'Vui lòng nhập giá trị đơn tối thiểu' })
                return;
            }
            data.ruleValueBill = ruleValueBill;
        }

        let fileList = this.coverRef.getValue();
        if (fileList) {
            let listImg = await this.uploadCover(fileList)
            data.cover = listImg[0]
        }
        if (this.props.postId) {
            data.postId = this.props.postId
        }
        this.props.appActions.createPromotion(data);
    }

    uploadCover(fileList) {
        return new Promise((resolve, reject) => {
            let name = new Date().getTime();
            let promoise = S3Util.addPhotos(FOLDER_COVER_S3, fileList, name);
            promoise.then(values => {
                resolve(values.map(value => value.Location))
            }).catch(e => {
                reject('Đã có lỗi xảy ra trong quá trình upload hình ảnh');
            })
        });
    }

    render() {
        const postId = this.props.postId;
        let isRender = true;
        let isUpdate = false;
        const promotion = this.props.app.promotion;
        if (postId) {
            isUpdate = true;
        }
        if (postId && !promotion) {
            isRender = false
        }
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="central-meta">
                        <div className="about">
                            <div className="personal">
                                <h5 className="f-title">CHƯƠNG TRÌNH KHUYẾN MÃI </h5>
                            </div>
                            <div>
                                <form method="post">
                                    <div className="ctk-row">
                                        <InputImage defaultValue={promotion && promotion.cover} ref={e => this.coverRef = e} />
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Tiêu đề: </label>
                                        {isRender && <input defaultValue={promotion && promotion.title} className="ctk-editor-input" ref={e => this.titleInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Tóm tắt ngắn: </label>
                                        {isRender && <input defaultValue={promotion && promotion.summary} className="ctk-editor-input" ref={e => this.summaryInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>

                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian bắt đầu: </label>
                                        {isRender && <input defaultValue={promotion && DateTimeUtil.toString(new Date(promotion.timeStart * 1000))} className="ctk-editor-input" ref={e => this.timeStartInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian kết thúc: </label>
                                        {isRender && <input defaultValue={promotion && DateTimeUtil.toString(new Date(promotion.timeEnd * 1000))} className="ctk-editor-input" ref={e => this.timeEndInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Khu vực áp dụng: </label>
                                        {isRender && <div className="ctk-editor-input c1"> <LocationMultiSelect defaultValue={promotion && promotion.location} ref={e => this.locationRef = e} /> </div>}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Loại khuyến mãi: </label>
                                        {isRender && <select disabled={isUpdate} onChange={this._onChangeTypePromotion} defaultValue={promotion ? promotion.typePromotion : this.state.typePromotion.getType()} className="ctk-editor-input" ref={e => this.typePromotionRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {TypeConstruction.getList().map((item, index) => {
                                                return <option key={index} value={item.getType()}>{item.getName()}</option>
                                            })}
                                        </select>
                                        }
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Loại Quà tặng: </label>
                                        {isRender && <select disabled={isUpdate} onChange={this._onChangeTypeGift} defaultValue={promotion ? promotion.typeGift : this.state.typeGift.getType()} className="ctk-editor-input" ref={e => this.typeGiftRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {TypeGift.getList().map((item, index) => {
                                                return <option key={index} value={item.getType()}>{item.getName()}</option>
                                            })}
                                        </select>
                                        }
                                    </div>
                                    {this.state.typePromotion == NOW_CONSTRUCTION &&
                                        <div className="ctk-row">
                                            <label className="ctk-editor-lable">Loại xi măng </label>
                                            {isRender && <div className="ctk-editor-input c1"> <CementMultiSelect defaultValue={promotion && promotion.ruleAcceptedCement} ref={e => this.cementRef = e} /> </div>}
                                        </div>
                                    }
                                    {this.state.typePromotion == NOW_CONSTRUCTION &&
                                        <div className="ctk-row">
                                            <label className="ctk-editor-lable">Số lượng tối thiểu: </label>
                                            {isRender && <input defaultValue={promotion && promotion.ruleQuantily} className="ctk-editor-input" ref={e => this.ruleQuantilyInputRef = e} type="number" placeholder="Số lượng sản phẩm tối thiểu" />}
                                        </div>
                                    }
                                    {this.state.typePromotion == NOW_CONSTRUCTION_V2 &&
                                        <div className="ctk-row">
                                            <label className="ctk-editor-lable">Giá trị đơn tối thiểu: </label>
                                            {isRender && <input defaultValue={promotion && promotion.ruleValueBill} className="ctk-editor-input" ref={e => this.ruleValueBillInputRef = e} type="number" placeholder="1.000.000" />}
                                        </div>
                                    }
                                </form>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                {isRender && <INSEEEditor defaultValue={promotion && promotion.content} ref={e => this.editorRef = e} />}
                            </div>
                            <div className="inbox-action ctkm">
                                {this.state.errorMsg && <div style={{ textAlign: 'right', paddingRight: '45px' }} className="errorMsg"><p>{this.state.errorMsg}</p></div>}
                                <ul>
                                    {promotion && promotion.status == 1 && <li onClick={this._onClickPublic}><span className="mbtn">Public</span></li>}
                                    <li onClick={this._onClickSave}><span className="mbtn">Save</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <AreYouSureModal isOpen={this.state.isAreYouSureModal} onOK={this.onPublicPost} onClose={this._onClosePublicModal} />
            </div>
        )
    }
}

export default CreatePromotion
