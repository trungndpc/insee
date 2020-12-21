import React, { Component } from 'react'

class Header extends Component {
  goToHome = e => {
    this.props.history.push('/')
  }

  goToInfo = e => {
    this.props.history.push('/info')
  }

  render() {
    return (
      <div>
        <ul>
          <li onClick={this.goToHome}>Home</li>
          <li onClick={this.goToInfo}>Info</li>
        </ul>
      </div>
    )
  }
}

export default Header
