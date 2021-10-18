import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'
import Loading from '../../../components/layout/Loading'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class StepOneHotline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
        }


    }

    componentDidMount() {
    }



    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: false,
            swipe: false
        };
        return (
            <div>
                <FormLayout {...this.props}>
                    <Slider ref={e => this.slider = e} {...settings}>
                        <div className="sc1">
                            <span className="contact100-form-title">
                                Anh/Chị đang gặp khó khăn về vấn đề gì?
                                <div className="line-bt" />
                            </span>
                            <div onClick={() => { this.slider.slickNext() }} className="issue-item row">
                                <div className="icon col-4">
                                    <img src={require('../../../resources/images/technical.png')}></img>
                                </div>
                                <div className="desc col-8">
                                    <div>
                                        <p className="name-issue">Tôi muốn tư vấn về kỹ thuật</p>
                                        <p className="name-issue-desc">Với những kỹ thuật có chuyên môn cao hàng đầu VN</p>
                                    </div>

                                </div>
                            </div>
                            <div onClick={() => { this.slider.slickNext() }} className="issue-item row">
                                <div className="icon col-4">
                                    <img src={require('../../../resources/images/promotion.png')}></img>
                                </div>
                                <div className="desc col-8">
                                    <div>
                                        <p className="name-issue">Tôi muốn tư vấn về chương trình khuyến mãi</p>
                                        <p className="name-issue-desc">Luôn luôn lắng nghe chia sẻ từ quý thầu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sc1">
                            <span className="contact100-form-title">
                                Anh/Chị chọn kênh tư vấn nào?
                                <div className="line-bt" />
                            </span>
                            <div onClick={() => { window.open('tel:0972797184', '_system'); }} className="issue-item row">
                                <div className="icon col-4">
                                    <img src={require('../../../resources/images/phone.png')}></img>
                                </div>
                                <div className="desc col-8">
                                    <div>
                                        <p className="name-issue">Gọi điện trực tiếp bằng điện thoại</p>
                                        <p className="name-issue-desc">24/7</p>
                                    </div>

                                </div>
                            </div>
                            <div onClick={() => { window.location.href = "https://zalo.me/call?callType=0&zid=5340650832903375859" }} className="issue-item row">
                                <div className="icon col-4">
                                    <img src={require('../../../resources/images/zalo.png')}></img>
                                </div>
                                <div className="desc col-8">
                                    <div>
                                        <p className="name-issue">Gọi bằng Zalo</p>
                                        <p className="name-issue-desc">Anh có thể chia sẻ hình ảnh trực tiếp từ công trình</p>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-bar">
                                <button onClick={() => { this.slider.slickPrev() }} ><i className="fa fa-backward"></i></button>
                            </div>
                        </div>
                    </Slider>


                </FormLayout>
                <Loading {...this.props} />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepOneHotline)


