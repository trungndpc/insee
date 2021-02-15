import React, { Component } from 'react'
import * as CementEnum from '../enum/CementEnum'

class SelectCement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            options: this.toOption(props.options),
            value: null
        }
        this.getValue = this.getValue.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.options != this.props.options) {
            nextState.options = this.toOption(nextProps.options)
        }

        if (nextProps.value && nextProps.value != this.props.value) {
            nextState.value = nextProps.value
        }
        return true;
    }

    toOption(listAccepted) {
        let arr = []
        listAccepted.forEach(id => {
            arr.push({ value: id, label: CementEnum.findById(id).name })
        });
        return arr;
    }

    getValue() {
        return this.selectRef.value;
    }


    render() {
        return (
            <select value={this.state.value} onChange={(event) => {this.setState({value: event.target.value})}} ref={e => this.selectRef = e}>
                <option value={0}>Loại xi măng sử dụng</option>
                {this.state.options && this.state.options.map(o => {
                    return (
                        <option value={o.value}>{o.label}</option>
                    )
                })}
            </select>
        )
    }
}

export default SelectCement
