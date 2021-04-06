import React, { Component } from 'react'

class ValueBillInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            valueBill: 0,
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getValue = this.getValue.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.valueBill == 0) {
            if (nextProps.value && nextProps.value != nextState.valueBill) {
                nextState.valueBill = nextProps.value
            }
            return true;
        }
        return this.state != nextState;
    }

    getValue() {
        let value = this.valueBillInputRef.value;
        if (value) {
            value = value.toString().replaceAll(",", "");
            return parseInt(value);
        }
        return value;
    }

    onChangeValue() {
        let value = this.valueBillInputRef.value;
        value = value && (value = value.toString().replaceAll(",", ""))
        if (!value || Number.isNaN(parseInt(value))) {
            value = 0;
        }
        this.setState({ valueBill: this.formatMoney(value) })
    }

    formatMoney(number) {
        return parseInt(number).toLocaleString();
    }

    render() {
        const rule = this.props.rule;
        return (
            <div style={{ width: '100%' }}>
                <input value={this.state.valueBill != 0 ? this.state.valueBill : ''} onChange={this.onChangeValue} ref={e => this.valueBillInputRef = e} className="insee-input" type="text" placeholder="Giá trị hóa đơn (đồng)" />
                {this.state.valueBill != 0 && this.state.valueBill < rule && <p className="err-slsp">Vui lòng nhập giá trị hóa đơn tối thiểu {rule.toLocaleString()} đồng</p>}
            </div>
        )
    }
}

export default ValueBillInput
