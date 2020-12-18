import React, { Component } from 'react'
import '../../resources/webapp/css/main.css'
import '../../resources/webapp/css/style.css';
import '../../resources/webapp/css/color.css';
import '../../resources/webapp/css/responsive.css';
import '../../resources/webapp/css/me.css';
import { useParams } from 'react-router-dom';


class WebAppLayout extends Component {

  componentDidMount() {
    console.log(useParams())
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
