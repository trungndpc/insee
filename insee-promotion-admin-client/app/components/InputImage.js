import React, { Component } from 'react'

class InputImage extends Component {

  constructor(props) {
    super(props)
    this._onClickToSelectIMG = this._onClickToSelectIMG.bind(this)
    this._onChangeInputImg = this._onChangeInputImg.bind(this)
    this.getValue = this.getValue.bind(this)
    this.inputRef = React.createRef();
    this.state = {
      preview: this.props.defaultValue ? this.props.defaultValue : 'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/promotion1.png',
      file: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.defaultValue != this.props.defaultValue) {
      nextState.preview = nextProps.defaultValue
    }
    return true;
  }

  renderReview(files) {
    return <div>
      {files && Object.values(files).map(function (item, index) {
        return (
          <div key={index} className="preview-img-item">
            <img src={URL.createObjectURL(item)} />
          </div>
        )
      })}
    </div>
  }

  getValue() {
    return this.state.file;
  }

  _onChangeInputImg(event) {
    let files = event.target.files;
    if (files && files[0]) {
      this.setState({
        file: files,
        preview: URL.createObjectURL(files[0])
      })
    }
  }

  _onClickToSelectIMG(e) {
    e.preventDefault();
    this.inputRef.click();
  }

  render() {
    return (
      <div>
        <div onClick={this._onClickToSelectIMG} className="img-container">
          <img className="select-change" src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/icn-camera.png'} />
          <img className="preview-img-item" src={this.state.preview} />
        </div>
        <input style={{ display: 'none' }} type="file" ref={e => this.inputRef = e} onChange={this._onChangeInputImg} />
      </div>

    )
  }
}

export default InputImage
