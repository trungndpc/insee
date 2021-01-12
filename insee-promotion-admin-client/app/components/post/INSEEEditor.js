import React, { Component } from 'react'
import '../../resources/js/ckeditor.js'

class INSEEEditor extends Component {

    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this);
    }

    componentDidMount() {
        ClassicEditor
            .create(document.querySelector('.editor'), {

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
                        'alignment'
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
            })
            .catch(error => {
                console.error('Oops, something went wrong!');
                console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
                console.warn('Build id: 6dkp8w5jo5z3-ncpei71nr563');
                console.error(error);
            });
    }

    getValue() {
        return window.editor.getData();
    }

    render() {
        return (
            <div className="editor"></div>
        )
    }
}

export default INSEEEditor
