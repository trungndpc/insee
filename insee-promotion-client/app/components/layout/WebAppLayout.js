import React, { Component } from 'react'
import '../../resources/webapp/css/main.css'
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/color.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/webapp/css/me.css';


class WebAppLayout extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default WebAppLayout
