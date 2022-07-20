import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";


class SideBar extends Component {

    render() {
        let pathname = window.location.pathname
        return (
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Menu</h4>
                    <ul className="naves">
                        <li>
                            <Link style={{ color: pathname == '/dashboard' && '#b71c1c' }} to={"/dashboard"}>Bảng Điều Khiển</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/post' && '#b71c1c' }} to={"/post"}>Bài viết</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/match' && '#b71c1c' }} to={"/match"}>Bóng đá</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/accumulation-point' && '#b71c1c' }} to={"/accumulation-point"}>Tích Điểm</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/accumulation-point' && '#b71c1c' }} to={"/phen-man"}>Phèn Mặn</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/introduction' && '#b71c1c' }} to={"/introduction"}>Giới thiệu thầu</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/customer' && '#b71c1c' }} to={"/customer"}>Nhà thầu</Link>
                        </li>
                        <li>
                            <Link style={{color: pathname == '/broadcast' && '#b71c1c'}} to={"/broadcast"}>Broadcast</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/construction/greeting-new-friend' && '#b71c1c' }} to={"/construction/greeting-new-friend"}>Chào bạn mới</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/construction' && '#b71c1c' }} to={"/construction"}>Khuyến mãi</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/redeem-point' && '#b71c1c' }} to={"/redeem-point"}>Đổi điểm</Link>
                        </li>
                        <li>
                            <Link style={{ color: pathname == '/gift' && '#b71c1c' }} to={"/gift"} >Quà tặng</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar
