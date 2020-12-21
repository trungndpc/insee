import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CreatePromotion extends Component {


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
                                        <input className="ctk-editor-input" type="text" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                    <div className="ctk-row">
                                        <label className="ctk-editor-lable">Tóm tắt ngắn: </label>
                                        <input className="ctk-editor-input" type="text" placeholder="Chương trình khuyến mãi siêu cấp" />
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex flex-row mt-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data="<p>Hello from CKEditor 5!</p>"
                                    onReady={editor => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                            <div className="inbox-action ctkm">
                                <ul>
                                    <li><span className="mbtn">Public</span></li>

                                    <li><span className="mbtn">Save</span></li>
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
