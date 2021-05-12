import React, { Component } from 'react'
import {City, District} from '../../data/Location'

const list = City.getList()
class LocationInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            city : 0,
            district: 52
        }
        this.getValues = this.getValues.bind(this);
        this.onChange = this.onChange.bind(this)
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

    onChange() {
        let city = this.cityInputRef.value;
        let district = this.districtInputRef.value;
        this.props.onChange && this.props.onChange(city, district)
    }

    render() {
        const districts = District.getList(this.state.city)
        return (
            <div className="location-input">
                <div style={{ float: 'left' }} className="location-input-city">
                    <select onChange={this.onChange} value={this.state.city} onChange={e => {this.setState({city: e.target.value}); this.onChange()}} ref={e => this.cityInputRef = e}>
                        <option value={0}>Tỉnh</option>
                        {list && list.map(function (item, index) {
                            return <option key={index} value={item.key}>{item.value}</option>
                        })}
                    </select>
                </div>
                <div style={{ float: 'right' }} className="location-input-district">
                    <select  value={this.state.district} onChange={e => {this.setState({district: e.target.value}); this.onChange()}} ref={e => this.districtInputRef = e}>
                        <option value={0}>Quận</option>
                        {districts && districts.map(function(item, index){
                            return <option key={index} value={item.key}>{item.value}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export default LocationInput
