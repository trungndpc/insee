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
    this.props.appActions.getProfile();
  }

  render() {
    const user = this.props.app.user;
    return (
      <div className="theme-layout">
        <section>
          <div className="feature-photo">
            {/* <figure><img className="responsive" style={{ objectFit: 'cover' }} src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/banner.png'} alt="" /></figure> */}
            <div className="container-fluid">
              <div className="row merged">
                <div className="col-lg-2 col-4">
                  <div className="user-avatar">
                    <figure>
                      <img style={{width: '150px', height: '150px'}} src={user && user.avatar} alt="" />
                    </figure>
                  </div>
                </div>
                <div className="col-lg-10 col-8">
                  <div className="timeline-info">
                    <ul>
                      <li className="admin-name">
                        <h5>{user && user.name}</h5>
                        <span>Admin</span>
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
