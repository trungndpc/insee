import React, { Component } from 'react'
import {TypeConstruction} from '../enum/TypeConstruction'
import Location from '../../data/Location'
import INSEEEditor from './INSEEEditor'

class CreatePromotion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 'Hello from TrungND',
            errorMsg: null
        }
        this._onClickSave = this._onClickSave.bind(this)
    }

    _onClickSave() {
        let title = this.titleInputRef.value;
        let summary = this.summaryInputRef.value;
        let location =  this.locationInputRef.value;
        let typePromotion = this.typePromotionRef.value;
        let timeStart = this.timeStartInputRef.value;
        let timeEnd = this.timeEndInputRef.value;
        let content = this.editorRef.getValue();

        if (!title) {
            this.setState({errorMsg: 'Vui lòng nhập tiêu đề'})
            return;
        }
        if(!summary) {
            this.setState({errorMsg: 'Vui lòng nhập tóm tắt'})
            return;
        }
        if (!content) {
            this.setState({errorMsg: 'Vui lòng nhập nội dung'})
            return;
        }

        if (!location) {
            this.setState({errorMsg: 'Vui lòng chọn khu vực áp dụng'})
            return;
        }

        if (!typePromotion || typePromotion == 0) {
            this.setState({errorMsg: 'Vui lòng chọn loại khuyến mãi'})
            return;
        }

        if (!timeStart) {
            this.setState({errorMsg: 'Vui lòng chọn thời gian áp dụng'})
            return;
        }

        if (!timeEnd) {
            this.setState({errorMsg: 'Vui lòng chọn thời gian kết thúc'})
            return;
        }


        let data = {
            title : title,
            summary: summary,
            content: content,
            typePromotion: typePromotion,
            location: location,
            timeStart: new Date(timeStart).getTime() / 1000,
            timeEnd: new Date(timeEnd).getTime() / 1000
        }
        // this.props.appActions.createPromotion(data);
        console.log(data)
    }


    render() {
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
                                        <input className="ctk-editor-input" ref={e => this.titleInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Tóm tắt ngắn: </label>
                                        <input className="ctk-editor-input" ref={e => this.summaryInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Khu vực áp dụng: </label>
                                        <select className="ctk-editor-input" ref={e => this.locationInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {Location.getList().map((item, index) => {
                                                return <option key={index} value={item.key}>{item.value}</option> 
                                            })}
                                        </select>
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Loại khuyến mãi: </label>
                                        <select className="ctk-editor-input" ref={e => this.typePromotionRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp">
                                            {TypeConstruction.getList().map((item, index) => {
                                                return <option key={index} value={item.getType()}>{item.getName()}</option> 
                                            })}
                                        </select>
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian bắt đầu: </label>
                                        <input className="ctk-editor-input" ref={e => this.timeStartInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Thời gian kết thúc: </label>
                                        <input className="ctk-editor-input" ref={e => this.timeEndInputRef = e} type="date" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                <INSEEEditor ref={e => this.editorRef = e} />
                            </div>
                            <div className="inbox-action ctkm">
                                {this.state.errorMsg && <div style={{textAlign: 'right', paddingRight: '45px'}} className="errorMsg"><p>{this.state.errorMsg}</p></div>}
                                <ul>
                                    <li><span className="mbtn">Public</span></li>
                                    <li onClick={this._onClickSave}><span className="mbtn">Save</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePromotion
