import React, { Component } from 'react'

class StoreInput extends Component {

    constructor(props) {
        super(props)
        this.getValues = this.getValues.bind(this)
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
                    <input ref={e => this.nameInputRef = e} className="insee-input" type="text" placeholder="Tên cửa hàng đã mua" />

                </div>
                <div style={{ float: 'right' }} className="owner-input-phone">
                    <input ref={e => this.phoneInputRef = e} className="insee-input" type="text" placeholder="SDT" />
                </div>
            </div>
        )
    }
}

export default StoreInput
