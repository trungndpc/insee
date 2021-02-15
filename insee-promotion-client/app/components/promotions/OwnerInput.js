import React, { Component } from 'react'

class OwnerInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerName: '',
            ownerPhone: ''
        }
        this.getValues = this.getValues.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.ownerName == '' || nextState.ownerPhone == '') {
            if (nextProps.ownerName && nextProps.ownerName != nextState.ownerName) {
                nextState.ownerName = nextProps.ownerName
            }
            if (nextProps.ownerPhone && nextProps.ownerPhone != nextState.ownerPhone) {
                nextState.ownerPhone = nextProps.ownerPhone
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
                    <input value={this.state.ownerName} onChange={e => this.setState({ownerName: e.target.value})} ref={e => this.nameInputRef = e} className="insee-input" type="text" placeholder="Tên chủ nhà" />

                </div>
                <div style={{ float: 'right' }} className="owner-input-phone">
                    <input value={this.state.ownerPhone} onChange={e => this.setState({ownerPhone: e.target.value})} ref={e => this.phoneInputRef = e} className="insee-input" type="text" placeholder="SDT" />
                </div>
            </div>
        )
    }
}

export default OwnerInput
