import React, { Component } from 'react'

const FM_NAME_INPUT = "smsCodeInput";
class OTPForm extends Component {

    constructor(props) {
        super(props)
        this.getValue = this.getValue.bind(this)
        this.reset = this.reset.bind(this)
        this._onChange = this._onChange.bind(this)
        this._onKeyPress = this._onKeyPress.bind(this)
    }


    getValue() {
        let rs = "";
        for (var i = 1; i <= 6; i++) {
            let inputRef = this[FM_NAME_INPUT + i];
            let value = inputRef.value;
            if (!value) {
                return null;
            }
            rs = rs + value;
        }
        return rs;
    }

    reset() {
        for (var i = 1; i <= 6; i++) {
            let inputRef = this[FM_NAME_INPUT + i];
            inputRef.value = '';
        }
    }


    _onChange(e) {
        if (e.target.value) {
            e.target.value = e.target.value % 10;
        } else {
            e.target.value = null;
        }
    }

    _onKeyPress(key, index) {
        if (key.key == 'Backspace') {
            let prev = index - 1;
            if (prev > 0) {
                let prevRef = this[FM_NAME_INPUT + prev];
                prevRef.focus();
            }
        } else if (key.key >= 0 && key.key <= 9) {
            let next = index + 1;
            if (next <= 6) {
                let nextRef = this[FM_NAME_INPUT + next]
                nextRef.focus();
            }
        }
    }


    render() {
        return (
            <div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput1 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 1) }} className="input100" type="number" />
                </div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput2 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 2) }} className="input100" type="number" />
                </div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput3 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 3) }} className="input100" type="number" />
                </div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput4 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 4) }} className="input100" type="number" />
                </div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput5 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 5) }} className="input100" type="number" />
                </div>
                <div className="wrap-input100 wrap-input25">
                    <input ref={e => this.smsCodeInput6 = e} onChange={this._onChange} onKeyUp={key => { this._onKeyPress(key, 6) }} className="input100" type="number" />
                </div>
            </div>
        )
    }
}

export default OTPForm
