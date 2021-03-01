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
    const account = this.props.app.user;
    const contractor = account && account.customer;
    const certificate = contractor && contractor.volumeCiment > 700
    return (
      <div className="theme-layout">
        <section style={{ zIndex: 50 }}>
          <div className="feature-photo">
            <figure><img className="responsive" style={{ objectFit: 'cover' }} src={require('../../resources/images/banner.jpg')} alt="" /></figure>
            <div className="container-fluid">
              <div className="row merged">
                <div className="col-avatar">
                  <div className="user-avatar">
                    <figure>
                      <img src={account && account.avatar} alt="" />
                    </figure>
                  </div>
                </div>
                <div className="col-name">
                  <div className="timeline-info">
                    <ul>
                      <li className="admin-name">
                        <h5>{account && account.name}</h5>
                        {contractor && <span>{City.getName(contractor.mainAreaId)}</span>}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-menu">
                  <i onClick={this._toggleMenuBar} className="fa fa-bars icon-bar " aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </section>
        <div id="main-menu" className={`topnav  ${this.state.isShowMobileBar ? 'showmenu' : ''}`}>
          <ContentSideBar onClickToLink={this._onClickToLink} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default WebAppLayout
