import React, { Component } from 'react'
import '../../resources/webapp/css/me.css';
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/css/mobile/font-awesome.css'
import { ContentSideBar } from '../layout/SideBar'
import { City } from '../../data/Location'

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
    const account = this.props.app.user && this.props.app.user.customer;
    const avatar = this.props.app.user && this.props.app.user.avatar;
    return (
      <div className="layout-container">
        <section style={{ zIndex: 50 }}>
          <div className="feature-photo">
            <img className="responsive" style={{ objectFit: 'cover' }} src={require('../../resources/images/banner.jpg')} />
            <div className="container-fluid">
              <div className="user-avatar">
                <img src={account && avatar} />
              </div>
              <div className="timeline-info">
                <p className="name">{account && account.fullName}</p>
                {account && <p className="loca"><i className="fa fa-map-marker"></i>{`${City.getName(account.mainAreaId)}`}</p>}
              </div>
              <div className="col-menu">
                <i onClick={this._toggleMenuBar} className="fa fa-bars icon-bar " aria-hidden="true"></i>
              </div>
            </div>
            <div>
            </div>
          </div>
        </section>
        {account && account.status == 2 &&
          <div id="main-menu" className={`topnav  ${this.state.isShowMobileBar ? 'showmenu' : ''}`}>
            <ContentSideBar onClickToLink={this._onClickToLink} />
          </div>
        }
        {account && account.status != 2 && <div style={{ textAlign: 'center', marginTop: '200px' }}>Vui lòng chờ xác nhận</div>}
        {account && account.status == 2 && this.props.children}
      </div>
    )
  }
}

export default WebAppLayout
