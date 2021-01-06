import React, { Component } from 'react'

class ImgViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: 'https://www.designbold.com/academy/wp-content/uploads/2018/09/10-trang-web-c%C3%B3-ngu%E1%BB%93n-h%C3%ACnh-%E1%BA%A3nh-mi%E1%BB%85n-ph%C3%AD-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-1.jpg',
            isShow: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open(url) {
        this.setState({isShow: true})
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.body.style.overflow = 'initial';
        this.setState({isShow: false})
    }

    render() {
        return (
            <div style={{display: this.state.isShow ? 'block' : 'none'}} className="img-view-container">
                <span onClick={this.close} className="btn-close"><i className="fa fa-times"></i></span>
                <table id="wrapper">
                    <tr>
                        <td><img src={this.state.url} /></td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ImgViewer
