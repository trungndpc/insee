import React, { Component } from 'react'
import { TypeConstruction } from '../enum/TypeConstruction'
import {City} from '../../data/Location'
import INSEEEditor from './INSEEEditor'
import DateTimeUtil from '../../utils/DateTimeUtil'
import AreYouSureModal from '../../components/modal/AreYouSureModal'
class CreatePromotion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'Hello from TrungND',
            errorMsg: null,
            isAreYouSureModal: false
        }
        this._onClickSave = this._onClickSave.bind(this)
        this._onClickPublic = this._onClickPublic.bind(this)
        this._onClosePublicModal = this._onClosePublicModal.bind(this)
        this.onPublicPost = this.onPublicPost.bind(this)
    }

    componentDidMount() {
        this.props.appActions.clearPromotionData()
        let postId = this.props.postId;
        if (postId) {
            this.props.appActions.getPromotionById(postId);
        }
    }

    _onClickPublic() {
        this.setState({isAreYouSureModal: true})
    }

    _onClosePublicModal() {
        this.setState({isAreYouSureModal: false})
    }

    onPublicPost() {
        this.props.appActions.updateStatusPromotion(this.props.postId)
    }

    _onClickSave() {
        let title = this.titleInputRef.value;
        let summary = this.summaryInputRef.value;
        let location = this.locationInputRef.value;
        let typePromotion = this.typePromotionRef.value;
        let timeStart = this.timeStartInputRef.value;
        let timeEnd = this.timeEndInputRef.value;
        let content = this.editorRef.getValue();
        let ruleQuantily = this.ruleQuantilyInputRef.value;

        if (!title) {
            this.setState({ errorMsg: 'Vui lòng nhập tiêu đề' })
            return;
        }
        if (!summary) {
            this.setState({ errorMsg: 'Vui lòng nhập tóm tắt' })
            return;
        }
        if (!ruleQuantily || ruleQuantily == 0) {
            this.setState({ errorMsg: 'Vui lòng nhập số lượng sản phẩm tối thiểu' })
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

        if (!typePromotion || typePromotion == 0) {
            this.setState({ errorMsg: 'Vui lòng chọn loại khuyến mãi' })
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
            typePromotion: typePromotion,
            location: location,
            timeStart: new Date(timeStart).getTime() / 1000,
            timeEnd: new Date(timeEnd).getTime() / 1000,
            ruleQuantily: ruleQuantily
        }
        if (this.props.postId) {
            data.postId = this.props.postId
        }
        this.props.appActions.createPromotion(data);
    }


    render() {
        const postId = this.props.postId;
        let isRender = true;
        const promotion = this.props.app.promotion;
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
                                        <label className="ctk-editor-lable">Tiêu đề: </label>
                                        {isRender && <input defaultValue={promotion && promotion.title} className="ctk-editor-input" ref={e => this.titleInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Tóm tắt ngắn: </label>
                                        {isRender && <input defaultValue={promotion && promotion.summary} className="ctk-editor-input" ref={e => this.summaryInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Số lượng tối thiểu: </label>
                                        {isRender && <input defaultValue={promotion && promotion.ruleQuantily} className="ctk-editor-input" ref={e => this.ruleQuantilyInputRef = e} type="number" placeholder="Số lượng sản phẩm tối thiểu" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Khu vực áp dụng: </label>
                                        {isRender && <select defaultValue={promotion && promotion.location} className="ctk-editor-input" ref={e => this.locationInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {City.getList().map((item, index) => {
                                                return <option key={index} value={item.key}>{item.value}</option>
                                            })}
                                        </select>
                                        }
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Loại khuyến mãi: </label>
                                        {isRender && <select defaultValue={promotion && promotion.typePromotion} className="ctk-editor-input" ref={e => this.typePromotionRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {TypeConstruction.getList().map((item, index) => {
                                                return <option key={index} value={item.getType()}>{item.getName()}</option>
                                            })}
                                        </select>
                                        }
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian bắt đầu: </label>
                                        {isRender && <input defaultValue={promotion && DateTimeUtil.toString(new Date(promotion.timeStart * 1000))} className="ctk-editor-input" ref={e => this.timeStartInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian kết thúc: </label>
                                        {isRender && <input defaultValue={promotion && DateTimeUtil.toString(new Date(promotion.timeEnd * 1000))} className="ctk-editor-input" ref={e => this.timeEndInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />}
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                {isRender && <INSEEEditor defaultValue={promotion && promotion.content} ref={e => this.editorRef = e} />}
                            </div>
                            <div className="inbox-action ctkm">
                                {this.state.errorMsg && <div style={{ textAlign: 'right', paddingRight: '45px' }} className="errorMsg"><p>{this.state.errorMsg}</p></div>}
                                <ul>
                                    {promotion && promotion.status == 1 && <li onClick={this._onClickPublic}><span className="mbtn">Public</span></li> }
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
