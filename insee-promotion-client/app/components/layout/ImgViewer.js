import React, { Component } from 'react'
import { ImageStatus } from '../enum/ImageStatus'

class ImgViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: '',
            isShow: false,
            item: null
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open(item) {
        console.log(item)
        this.setState({ isShow: true, url: item.link, item: item })
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.body.style.overflow = 'initial';
        this.setState({ isShow: false })
    }

    render() {
        return (
            <div style={{ display: this.state.isShow ? 'block' : 'none' }} className="img-view-container">
                <span onClick={this.close} className="btn-close"><i className="fa fa-times"></i></span>
                <table id="wrapper">
                    <tr>
                        <td>
                            <img src={this.state.url} />
                            {this.state.item && <p>{this.state.item.id} - Trang thái: <span style={{ color: ImageStatus.getColor(this.state.item.status) }}>Chờ duyệt</span></p>}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ImgViewer
