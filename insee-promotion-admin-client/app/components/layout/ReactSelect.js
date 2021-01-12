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
        this.state.value;
    }

    render() {
        return (
            <CreatableSelect
                isClearable={true}
                onChange={this.handleChange}
                options={this.props.options ? this.props.options : options}
            />
        )
    }
}

export default ReactSelect
