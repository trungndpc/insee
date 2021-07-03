import React, { Component } from 'react'

class SimpleImgViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    open() {
        this.setState({isShow: true})
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.body.style.overflow = 'initial';
        this.setState({ isShow: false })
    }

    onClick() {
        if (this.state.isShow) {
            this.close();
        }else {
            this.open();
        }
    }

    render() {
        return (
            <div style={{display: 'inline-block'}} onClick={this.onClick}>
                {!this.state.isShow && <img className={this.props.className} src={this.props.children} />}
                {this.state.isShow &&
                    <div style={{ display: this.state.isShow ? 'block' : 'none' }} className="img-view-container">
                        <span onClick={this.close} className="btn-close">X</span>
                        <table id="wrapper">
                            <tr>
                                <td>
                                    <img src={this.props.children} />
                                </td>
                            </tr>
                        </table>
                    </div>
                }
            </div>

        )
    }
}

export default SimpleImgViewer
