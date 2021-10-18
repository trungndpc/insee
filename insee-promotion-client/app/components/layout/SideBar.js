import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";


export class ContentSideBar extends Component {

    constructor(props) {
        super(props)
        this._onClickToLink = this._onClickToLink.bind(this)
    }

    _onClickToLink() {
        this.props.onClickToLink && this.props.onClickToLink
    }

    render() {
        let pathname = window.location.pathname;
        return (
            <ul className="naves">
                <li>
                    <Link className={pathname.startsWith('/khach-hang') ? 'active' : ''} onClick={this._onClickToLink} to={"/khach-hang"}>Thông tin tài khoản</Link>
                </li>
                <li>
                    <Link className={pathname.startsWith('/ds-cua-hang') ? 'active' : ''} onClick={this._onClickToLink} to={"/ds-cua-hang"}>Cửa hàng gần bạn</Link>
                </li>
                <li>
                    <Link className={pathname.startsWith('/khuyen-mai') ? 'active' : ''} onClick={this._onClickToLink} to={"/khuyen-mai"}>Chương trình khuyến mãi độc quyền</Link>
                </li>
                <li>
                    <Link className={pathname.startsWith('/lich-su') ? 'active' : ''} onClick={this._onClickToLink} to={"/lich-su"}>Lịch sử nhận quà</Link>
                </li>
            </ul>
        )
    }

}

export class SideBar extends Component {

    render() {
        return (
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Thông tin</h4>
                    <ContentSideBar />
                </div>
            </aside>
        )
    }
}

