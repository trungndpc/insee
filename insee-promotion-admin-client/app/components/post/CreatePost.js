import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        let content = this.state.data;
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
        let data = {
            title : title,
            summary: summary,
            content: content
        }
        this.props.appActions.createPromotion(data);
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
                                        <label className="ctk-editor-lable">Khu vực : </label>
                                        <input className="ctk-editor-input" ref={e => this.summaryInputRef = e} type="text" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                <CKEditor
                                    ref={e => this.editor = e}
                                    editor={ClassicEditor}
                                    data="<p>Hello from CKEditor 5!</p>"
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({data: data});
                                    }}
                                />
                            </div>
                            <div className="inbox-action ctkm">
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
