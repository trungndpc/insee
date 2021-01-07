import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";


class SideBar extends Component {

    render() {
        return (
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Menu</h4>
                    <ul className="naves">
                        <li>
                            <Link to={"/"}>Thông tin tài khoản</Link>
                        </li>
                        <li>
                            <Link to={"/post"}>Bài viết</Link>
                        </li>
                        <li>
                            <Link to={"/customer"}>Khách Hàng</Link>
                        </li>
                        <li>
                            <Link to={"/construction"}>Công trình</Link>
                        </li>
                        <li>
                            <Link to={"/history"} >Lịch sử quà tặng</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar
