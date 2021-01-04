import React, { Component } from 'react'

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
                    </select>
                </div>
                <div style={{ float: 'right' }} className="location-input-district">
                    <select  ref={e => this.districtInputRef = e}>
                        <option value={0}>Quận</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default LocationInput
