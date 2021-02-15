import React, { Component } from 'react'
import {
    Switch,
    Route,
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
        return <ul>
            <ul className="naves">
                <li>
                    <Link style={{color: pathname == '/khach-hang' && '#b71c1c'}} onClick={this._onClickToLink} to={"/khach-hang"}>Thông tin tài khoản</Link>
                </li>
                <li>
                    <Link style={{color: pathname == '/khuyen-mai' && '#b71c1c'}} onClick={this._onClickToLink} to={"/khuyen-mai"}>Chương trình khuyến mãi độc quyền</Link>
                </li>
                {/* <li>
                    <Link style={{color: pathname == '/nha-thau-xanh' && '#b71c1c'}} onClick={this._onClickToLink} to={"/nha-thau-xanh"}>Nhà thầu xanh</Link>
                </li> */}
                <li>
                    <Link style={{color: pathname == '/lich-su' && '#b71c1c'}} onClick={this._onClickToLink} to={"/lich-su"}>Lịch sử nhận quà</Link>
                </li>
            </ul>
        </ul>
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

