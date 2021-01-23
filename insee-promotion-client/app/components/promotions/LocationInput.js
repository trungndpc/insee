import React, { Component } from 'react'
import Location from '../../data/Location'

const list = Location.getList()
class LocationInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            city : 0,
            district: 0
        }
        this.getValues = this.getValues.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.city == 0 || this.state.district == 0) {
            if (nextProps.city != 0 && nextProps.city != this.state.city) {
                nextState.city = nextProps.city;
            }
            if (nextProps.district != 0 && nextProps.district != this.state.district) {
                nextState.district = nextProps.district;
            }
            return true;
        }
        return this.state != nextState;
    }

    getValues() {
        let city = this.cityInputRef.value;
        let district = this.districtInputRef.value;
        return {
            city: city,
            district: district
        }
    }

    render() {
        return (
            <div className="location-input">
                <div style={{ float: 'left' }} className="location-input-city">
                    <select value={this.state.city} onChange={e => this.setState({city: e.target.value})} ref={e => this.cityInputRef = e}>
                        <option value={0}>Tỉnh</option>
                        {list && list.map(function (item, index) {
                            return <option key={index} value={item.key}>{item.value}</option>
                        })}
                    </select>
                </div>
                <div style={{ float: 'right' }} className="location-input-district">
                    <select value={this.state.district} onChange={e => this.setState({district: e.target.value})} ref={e => this.districtInputRef = e}>
                        <option value={0}>Quận</option>
                        <option value={1}>Quận 1</option>
                        <option value={2}>Quận 2</option>
                        <option value={3}>Quận 3</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default LocationInput
