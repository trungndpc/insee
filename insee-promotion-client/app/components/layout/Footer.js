import React, { Component } from 'react'
class Footer extends Component {

    componentDidMount() {
        this.minH = window.innerHeight - 85;
    }

    render() {
        return (
            <div style={{minHeight: this.minH + 'px'}} className="footer">
                <img src={require('../../resources/images/logo.png')} />
            </div>
        )
    }
}

export default Footer
