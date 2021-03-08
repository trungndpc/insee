import React, { Component } from 'react'
import DateTimeUtil from '../utils/DateTimeUtil'

const years = DateTimeUtil.getArrayYear().reverse();
const months = DateTimeUtil.getArrayMonth();
class BirtdayInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            year: 0,
            month: 0,
            day: 0,
            default: null
        }
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.getListDay = this.getListDay.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.default && nextProps.default != this.props.default && this.props.default == null) {
            const date = new Date(nextProps.default * 1000);
            let day = date.getDate()
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            nextState.year = year;
            nextState.day = day;
            nextState.month = month;
            return true;
        }
        return true;
    }

    getValue() {
        let errorMsg = ''
        let error = 0;
        let value = 0;
        if (this.state.year == 0) {
            errorMsg = 'Vui lòng chọn năm sinh'
            error = -1;
        } else if (this.state.month == 0) {
            errorMsg = 'Vui lòng chọn tháng sinh'
            error = -1;
        } else if (this.state.day == 0) {
            errorMsg = 'Vui lòng chọn ngày sinh'
            error = -1;
        } else {
            value = new Date(this.state.year, this.state.month, this.state.day, 0, 0, 0, 0).getTime();
        }
        return {
            error: error,
            errorMsg: errorMsg,
            value: value
        }
    }

    getListDay(year, month) {
        if (year == 0 || month == 0) {
            return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        }
        return DateTimeUtil.getArrayDay(month, year);
    }

    onChangeDay(e) {
        let value = e.target.value;
        this.setState({
            day: value
        })
    }

    onChangeYear(e) {
        let value = e.target.value;
        this.setState({
            year: value
        })
    }

    onChangeMonth(e) {
        let value = e.target.value;
        this.setState({
            month: value
        })
    }

    render() {
        const listDay = this.getListDay(this.state.year, this.state.month);
        return (
            <div className="birthday">
                <div style={{float: 'left'}} className="birthday-item">
                    <select value={this.state.day} onChange={this.onChangeDay} >
                        <option value={0}>Ngày</option>
                        {listDay && listDay.map(function (day) {
                            return <option key={day} value={day}>{day}</option>;
                        })}
                    </select>
                </div>
                <div className="birthday-item">
                        <select value={this.state.month} onChange={this.onChangeMonth} >
                            <option>Tháng</option>
                            {months.map(function (month) {
                                return (<option key={month.id} value={month.id}>{month.name}</option>)
                            })}
                        </select>
                </div>
                <div style={{float: 'right'}} className="birthday-item">
                    <select value={this.state.year} onChange={this.onChangeYear}  >
                        <option value={0}>Năm sinh</option>
                        {years.map(function (year) {
                            return (<option key={year} value={year}>{year}</option>)
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export default BirtdayInput
