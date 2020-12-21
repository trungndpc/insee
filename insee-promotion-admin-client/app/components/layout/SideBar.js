import React, { Component } from 'react'
import {
    Switch,
    Route,
    Link
} from "react-router-dom";


class SideBar extends Component {

    render() {
        return (
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Thông tin</h4>
                    <ul className="naves">
                        <li>
                            <Link to={"/"}>Thông tin tài khoản</Link>
                        </li>
                        <li>
                            <Link to={"/promotion"}>Chương trình khuyễn mãi</Link>
                        </li>
                        <li>
                            <Link to={"/verify"} >Duyệt yêu cầu</Link>
                        </li>
                        <li>
                            <Link to={"/customer"}>Khách Hàng</Link>
                        </li>
                        <li>
                            <Link to={"/gift"} >Nhận quà</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar
