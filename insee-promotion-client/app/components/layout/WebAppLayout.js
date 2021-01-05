import React, { Component } from 'react'
import '../../resources/webapp/css/main.css'
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/webapp/css/me.css';
import '../../resources/css/mobile/font-awesome.css'
import {
  Link,
} from "react-router-dom";

class WebAppLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowMobileBar: false
    }
    this._toggleMenuBar = this._toggleMenuBar.bind(this);
    this._onClickToLink = this._onClickToLink.bind(this);
  }

  componentDidMount() {
    this.props.appActions.getProfile();
    this.props.appActions.getCustomer();
  }

  _toggleMenuBar() {
    this.setState({
      isShowMobileBar: !this.state.isShowMobileBar
    })
  }

  _onClickToLink() {
    this.setState({
      isShowMobileBar: false
    })
  }

  render() {
    const account = this.props.app.user;
    return (
      <div className="theme-layout">
        <section>
          <div className="feature-photo">
            <figure><img className="responsive" style={{ objectFit: 'cover' }} src={require('../../resources/images/banner.png')} alt="" /></figure>
            <div className="container-fluid">
              <div className="row merged">
                <div className="col-lg-2 col-4 col-avatar">
                  <div className="user-avatar">
                    <figure>
                      <img src={account && account.avatar} alt="" />
                    </figure>
                  </div>
                </div>
                <div className="col-lg-10 col-8">
                  <div className="timeline-info">
                    <ul>
                      <li className="admin-name">
                        <h5>{account && account.name}</h5>
                        <span>Tp Hồ Chí Minh</span>
                      </li>
                    </ul>
                  </div>
                  <i onClick={this._toggleMenuBar} className="fa fa-bars icon-bar " aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div>
            </div>
            {
              this.state.isShowMobileBar &&
              <div id="main-menu" className={`topnav navbar collapse navbar-collapse in`}>
                <ul>
                  <ul className="naves">
                    <li>
                      <Link onClick={this._onClickToLink} to={"/khach-hang"}>Thông tin tài khoản</Link>
                    </li>
                    <li>
                      <Link onClick={this._onClickToLink} to={"/khuyen-mai"}>Chương trình khuyễn mãi độc quyền</Link>
                    </li>
                    <li>
                      <Link onClick={this._onClickToLink} to={"/cong-trinh"}>Công trình</Link>
                      <a href="#" ></a>
                    </li>
                    <li>
                      <Link onClick={this._onClickToLink} to={"/nha-thau-xanh"}>Nhà thầu xanh</Link>
                      <a href="#" ></a>
                    </li>
                    <li>
                      <Link onClick={this._onClickToLink} to={"/lich-su"}>Lịch sử nhận qùa</Link>
                    </li>
                  </ul>
                </ul>
              </div>
            }
          </div>
        </section>
        {this.props.children}
      </div>
    )
  }
}

export default WebAppLayout
