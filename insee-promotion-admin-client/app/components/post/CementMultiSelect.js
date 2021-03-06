import React, { Component } from 'react'
import Select from 'react-select'
import * as CementEnum from '../enum/CementEnum'

const options = CementEnum.getOption()
class CementMultiSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.defaultValue && this.toOptionDefault(this.props.defaultValue)
        }
        this.handleChange = this.handleChange.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    toOptionDefault(valueDefault) {
        var arr = [];
        valueDefault.forEach(id => {
            var cement = CementEnum.findById(id);
            arr.push({value: id, label: cement.name})
        });
        return arr;
    }

    handleChange = (newValue, actionMeta) => {
        this.setState({value: newValue})
    };

    getValue() {
        if (this.state.value) {
            return this.state.value.map(e => e.value);
        }
    }

    render() {
        return (
            <Select
                placeholder={this.props.placeholder}
                isClearable={true}
                isMulti={true}
                onChange={this.handleChange}
                defaultValue={this.state.value}
                options={this.props.options ? this.props.options : options}
            />
        )
    }
}

export default CementMultiSelect
