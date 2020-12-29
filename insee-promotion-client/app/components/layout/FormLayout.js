import React, { Component } from 'react'
import Footer from '../layout/Footer'

class FormLayout extends Component {

    constructor(props) {
        super(props)
        this.minHeight  = 0;
        if (this.props.copyright) {
            this.minHeight = window.innerHeight - 100;
        }else{
            this.minHeight = window.innerHeight - 50;
        }
    }


    render() {
        return (
            <div className="container-contact100 login-page">
                <div className="wrap-contact100">
                    <div style={{ minHeight: this.minHeight + 'px' }} className="contact100-form validate-form form insee-wrap">
                        {this.props.children}
                    </div>
                    <div className="bg-desktop contact100-more flex-col-c-m"></div>
                </div>
                {this.props.copyright && 
                    <div className="footer-desc">
                        <p>Nền tảng chính thức của nhà thuần INSEE Việt Nam</p>
                        <p>Copyright Siam City Cerment (Vietnam) Ltd.</p>
                    </div>
                }
                <Footer />
            </div>
        )
    }
}

export default FormLayout
