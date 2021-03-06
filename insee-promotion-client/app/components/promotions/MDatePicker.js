import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi)

class MDatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.date && nextProps.date != nextState.date && nextState.date == null) {
            nextState.date = nextProps.date
            return true;
        }
        return this.state != nextState;
    }

    getValue() {
        let date = this.state.date;
        if (date) {
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return new Date(year, month, 0, 0, 0, 0, 0).getTime() / 1000;
        }

    }

    handleChange(date) {
        this.setState({
            date: date
        });
    }

    render() {
        return (
            <DatePicker placeholderText={"Thời gian dự kiến thi công (tháng/năm)"} selected={this.state.date} showMonthYearPicker onChange={this.handleChange} dateFormat="MMMM - yyyy" className="insee-input" locale="vi" />
        )
    }
}

export default MDatePicker
