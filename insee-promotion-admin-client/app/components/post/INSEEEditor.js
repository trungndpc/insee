import React, { Component } from 'react'

class INSEEEditor extends Component {

    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this);
    }

    componentDidMount() {
        ClassicEditor
            .create(document.querySelector('.editor'), {
                fontFamily: {
                    options: [
                        'default',
                        'Ubuntu, Arial, sans-serif',
                        'Ubuntu Mono, Courier New, Courier, monospace'
                    ]
                }, fontSize: {
                    options: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    supportAllValues: true
                },
                fontColor: {
                    columns: 6,
                    documentColors: 12,
                },
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'indent',
                        'outdent',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        'mediaEmbed',
                        'undo',
                        'redo',
                        'alignment',
                        'fontFamily',
                        'fontSize',
                        'fontColor'
                    ]
                },
                language: 'en',
                image: {
                    toolbar: [
                        'imageTextAlternative',
                        'imageStyle:full',
                        'imageStyle:side'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                licenseKey: '',

            })
            .then(editor => {
                window.editor = editor;
                if (this.props.defaultValue) {
                    editor.setData(this.props.defaultValue)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    getValue() {
        let data =  window.editor.getData();
        return data;
    }

    render() {
        return (
            <div className="editor"></div>
        )
    }
}

export default INSEEEditor
