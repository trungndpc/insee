import React, { Component } from 'react'
import Location from '../../data/Location'
import DateTimeUtil from '.././../utils/DateTimeUtil'
import {
    Link,
} from "react-router-dom";
class ListConstruction extends Component {

    componentDidMount() {
        this.props.appActions.getListConstruction();
    }

    render() {
        const constructions = this.props.app.constructions;
        return (
            <div className="loadMore">
                {constructions && constructions.map(function (item, index) {
                    return (
                        <Link to={"/cong-trinh/" + item.id}>
                            <div key={index} className="central-meta item" style={{ display: 'inline-block' }}>
                                <div className="user-post">
                                    <div className="friend-info">
                                        <div className="friend-name">
                                            <ins><a href="time-line.html">Công trình tại {Location.getName(item.city)} - Quân 12`</a></ins>
                                            <span>thời gian khởi công: {DateTimeUtil.formatMonth(new Date(item.estimateTimeStart * 1000))}</span>
                                            <span>Loại công trình: </span>
                                            <span>Trạng thái: </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    )
                })}

            </div>
        )
    }
}

export default ListConstruction
