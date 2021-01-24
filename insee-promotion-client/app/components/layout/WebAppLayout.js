import React, { Component } from 'react'
import '../../resources/webapp/css/main.css'
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/webapp/css/me.css';
import '../../resources/css/mobile/font-awesome.css'
import {ContentSideBar} from '../layout/SideBar'
import {City} from '../../data/Location'

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
    const contractor = this.props.app.customer;
    const certificate = contractor && contractor.volumeCiment > 700
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
                        {contractor && <span>{City.getName(contractor.mainAreaId)}</span> }
                        {certificate && <img className="ntx-icon" src="https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/certificate-icon.png"/> }
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
                <ContentSideBar onClickToLink={this._onClickToLink}/>
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
