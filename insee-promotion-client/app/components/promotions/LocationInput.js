import React, { Component } from 'react'
import Location from '../../data/Location'

const list = Location.getList()
class LocationInput extends Component {

    constructor(props) {
        super(props)
        this.getValues = this.getValues.bind(this);
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
                    <select ref={e => this.cityInputRef = e}>
                        <option value={0}>Tỉnh</option>
                        {list && list.map(function (item, index) {
                            return <option key={index} value={item.key}>{item.value}</option>
                        })}
                    </select>
                </div>
                <div style={{ float: 'right' }} className="location-input-district">
                    <select ref={e => this.districtInputRef = e}>
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
