import React, { Component } from 'react'

class ImageInput extends Component {

  constructor(props) {
    super(props)
    this._onClickToSelectIMG = this._onClickToSelectIMG.bind(this)
    this._onChangeInputImg = this._onChangeInputImg.bind(this)
    this.renderReview = this.renderReview.bind(this)
    this.getValue = this.getValue.bind(this)
    this.state = {
      files: null,
      inputDesc: null
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.inputDesc == null && nextProps.value != this.props.value) {
      nextState.inputDesc = nextProps.value;
      return true;
    }
    return nextState != this.state
  }

  _onChangeInputImg(event) {
    let files = event.target.files;
    let desc = `Bạn đã chọn ${files.length} hình`
    this.setState({ files: event.target.files, inputDesc: desc })
  }

  _onClickToSelectIMG(e) {
    e.preventDefault();
    this.inputRef.click();
  }

  getValue() {
    return this.state.files;
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

  render() {
    return (
      <div className="img-container">
        <input type="file" multiple={true} onChange={this._onChangeInputImg} ref={e => this.inputRef = e} style={{ display: 'none' }} />
        <input onClick={this._onClickToSelectIMG} placeholder={this.props.placeholder} defaultValue={this.state.inputDesc ? this.state.inputDesc : ''} className="insee-input" type="text" />
        <img onClick={this._onClickToSelectIMG} className="img-icon" src={require('../../resources/images/icn-camera.png')} />
      </div>
    )
  }
}

export default ImageInput
