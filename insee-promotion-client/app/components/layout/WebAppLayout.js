import React, { Component } from 'react'
import '../../resources/webapp/css/main.css'
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/color.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/webapp/css/me.css';


class WebAppLayout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.appActions.getCustomer();
  }

  render() {
    const account = this.props.app.customer;
    console.log(account)
    return (
      <div className="theme-layout">
        <section>
          <div className="feature-photo">
            <figure><img className="responsive" style={{ objectFit: 'cover' }} src={require('../../resources/images/banner.png')} alt="" /></figure>
            <div className="container-fluid">
              <div className="row merged">
                <div className="col-lg-2 col-4">
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
                        <h5>{account && account.fullName}</h5>
                        <span>Tp Hồ Chí Minh</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.props.children}
      </div>
    )
  }
}

export default WebAppLayout
