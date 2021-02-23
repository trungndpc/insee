import React, { Component } from 'react'

class StoreInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeName: '',
            storePhone: ''
        }
        this.getValues = this.getValues.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.storeName == '' || nextState.storePhone == '') {
            if (nextProps.storeName && nextProps.storeName != nextState.storeName) {
                nextState.storeName = nextProps.storeName
            }
            if (nextProps.storePhone && nextProps.storePhone != nextState.storePhone) {
                nextState.storePhone = nextProps.storePhone
            }
            return true;
        }
        return this.state != nextState;
    }

    getValues() {
        let name = this.nameInputRef.value;
        let phone = this.phoneInputRef.value;
        return {
            name: name,
            phone: phone
        }
    }

    render() {
        return (
            <div className="owner-input">
                <div style={{ float: 'left' }} className="owner-input-name">
                    <input value={this.state.storeName} onChange={e => this.setState({storeName: e.target.value})} ref={e => this.nameInputRef = e} className="insee-input" type="text" placeholder="Tên cửa hàng đã mua" />

                </div>
                <div style={{ float: 'right' }} className="owner-input-phone">
                    <input value={this.state.storePhone} onChange={e => this.setState({storePhone: e.target.value})} ref={e => this.phoneInputRef = e} className="insee-input" type="text" placeholder="SDT cửa hàng" />
                </div>
            </div>
        )
    }
}

export default StoreInput
