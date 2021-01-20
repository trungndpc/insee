import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

class ReactSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    handleChange = (newValue, actionMeta) => {
        this.setState({value: newValue})
    };

    getValue() {
        return this.state.value;
    }

    render() {
        return (
            <CreatableSelect
                placeholder={this.props.placeholder}
                isClearable={true}
                onChange={this.handleChange}
                options={this.props.options ? this.props.options : options}
            />
        )
    }
}

export default ReactSelect
