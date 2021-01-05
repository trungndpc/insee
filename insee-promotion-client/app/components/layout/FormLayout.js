import React, { Component } from 'react'
import Footer from '../layout/Footer'

class FormLayout extends Component {

    constructor(props) {
        super(props)
        this.minHeight  = 0;
        this.state = {
            pBottom: 0
        }
        if (this.props.copyright) {
            this.minHeight = window.innerHeight - 100;
        }else{
            this.minHeight = window.innerHeight - 50;
        }
        this.contenRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(function() {
            let contentH = this.contenRef.offsetHeight;
            if (Math.abs(this.minHeight - contentH) <= 50) {
                this.setState({pBottom : 50})
            }
        }.bind(this), 500)
    }


    render() {
        return (
            <div className="container-contact100 login-page">
                <div className="wrap-contact100">
                    <div style={{ minHeight: this.minHeight + 'px', paddingBottom: this.state.pBottom + 'px'}} className="contact100-form validate-form form insee-wrap">
                        <div ref={e => this.contenRef = e}>
                         {this.props.children}
                        </div>
                    </div>
                    <div className="bg-desktop contact100-more flex-col-c-m"></div>
                </div>
                {this.props.copyright && 
                    <div className="footer-desc">
                        <p>Nền tảng chính thức của nhà thầu INSEE Việt Nam</p>
                        <p>Copyright Siam City Cerment (Vietnam) Ltd.</p>
                    </div>
                }
                {/* <Footer /> */}
            </div>
        )
    }
}

export default FormLayout
