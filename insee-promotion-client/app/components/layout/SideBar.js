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
                            <a href="newsfeed.html" >Thông tin tài khoản</a>
                        </li>
                        <li>
                            <a href="inbox.html" >Chương trình khuyễn mãi độc quyền</a>
                        </li>
                        <li>
                            <a href="fav-page.html" >Thiết kế hồ sơ nhà thầu</a>
                        </li>
                        <li>
                            <a href="fav-page.html" >Lịch sử nhận quà</a>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar
