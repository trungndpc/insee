import React, { Component } from 'react'
import { withRouter } from "react-router";
import { COLLECT_POINT, LOYALTY, PHEN_MAN, SHARE_LINK_REGISTRY, GREETING_NEW_FRIEND, TypePromotion } from '../../components/enum/TypePromotion'
import { CONTRUCTOR } from '../../components/enum/UserRole'
import WebUtil from '../../utils/WebUtil'
import PromotionModel from '../../model/PromotionModel'
import LeaderBoard from '../../components/promotions/LeaderBoard'
import { renderToString } from 'react-dom/server'
import CustomerModel from '../../model/CustomerModel';
import { City } from '../../data/Location';

class DetailPromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopupModal: false,
            tops: null
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.viewDetail = this.viewDetail.bind(this)
        this.onClickDetail = this.onClickDetail.bind(this)
        this.openZaloFormShare = this.openZaloFormShare.bind(this)
        this.viewListPromotion = this.viewListPromotion.bind(this)
    }

    componentDidMount() {
        let postId = this.props.postId;
        this.props.appActions.getPromotionById(postId);
        if (postId == 1037) {
            const account = this.props.app.user && this.props.app.user.customer;
            CustomerModel.leaderBoard(account.mainAreaId)
                .then(resp => {
                    if (resp.error == 0) {
                        this.setState({ tops: resp.data })
                    }
                })
        }
    }

    toggleModal() {
        this.setState({
            showPopupModal: !this.state.showPopupModal
        })
    }

    viewDetail() {
        const user = this.props.app.user;
        if (user.roleId == CONTRUCTOR.getRoleId()) {
            const promotion = this.props.app.promotion;
            const one = promotion && promotion.one;
            let url = TypePromotion.getLink2Detail(one.typePromotion, one.id)
            if (promotion.one.typePromotion == GREETING_NEW_FRIEND.type) {
                window.location.href = url;
            } else {
                this.props.history.push(url)
            }
        } else {
            this.setState({
                showPopupModal: true
            })
        }
    }

    viewListPromotion() {
        this.props.history.push("/khuyen-mai")
    }

    onClickDetail() {
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        if (one.typePromotion == LOYALTY.type || one.typePromotion == COLLECT_POINT.type || one.typePromotion == PHEN_MAN.type) {
            PromotionModel.startZaloBot(one.id)
                .then(resp => {
                    if (resp.error == 0 && resp.data) {
                        window.location.href = "https://zalo.me/" + resp.data;
                    } else {
                        this.viewDetail()
                    }
                })
        } else {
            this.viewDetail()
        }
    }

    openZaloFormShare() {
        const user = this.props.app.user;
        let url = process.env.DOMAIN + '/vung-xay-cuoc-song?typeInapp=1&code=' + user.referralCode;
        let urlEncoded = encodeURIComponent(url)
        if (WebUtil.isOSDevice()) {
            window.location.href = "zaloshareext://shareext?url=" + urlEncoded + "&type=8&version=1"
        } else {
            window.location.href = "intent://zaloapp.com/#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.SUBJECT=;S.android.intent.extra.TEXT=" + urlEncoded + ";B.hidePostFeed=false;B.backToSource=true;end"
        }
    }

    render() {
        const account = this.props.app.user && this.props.app.user.customer;
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        const type = one && one.typePromotion;
        const error_promotion = promotion && promotion.error;
        var content;
        if (one) {
            content = one.content;
            if (one.id == 1037) {
                content = content.replace("{{LEADER_BOARD}}", renderToString(<LeaderBoard location={City.getName(account.mainAreaId)} tops={this.state.tops} />))
            }
        }
        return (
            <div className="loadMore">
                {this.state.showPopupModal && <InformModal outClick={this.toggleModal} />}
                {error_promotion == 0 &&

                    <div className="central-meta item" style={{ display: 'inline-block' }}>
                        <div className="user-post">
                            <div className="friend-info">
                                <div className="post-meta">
                                    <img src={one && one.cover} alt="" />
                                    {one &&
                                        <div className="description cke-content">
                                            <div dangerouslySetInnerHTML={{ __html: `${content}` }}>
                                            </div>
                                        </div>
                                    }
                                    {type && type != SHARE_LINK_REGISTRY.type &&
                                        <div style={{ textAlign: 'center' }}>
                                            {one && <a onClick={this.onClickDetail} >
                                                <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                            </a>
                                            }
                                        </div>
                                    }
                                    {type && type == SHARE_LINK_REGISTRY.type && one.id != 1037 &&
                                        <div style={{ textAlign: 'center' }}>
                                            {one &&
                                                <div className="btn-share">
                                                    <a onClick={this.openZaloFormShare}>
                                                        <button className="btn-insee btn-insee-bg post-btn">Giới thiệu thầu</button>
                                                    </a>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {one && one.id == 1037 &&
                                        <div style={{ textAlign: 'center' }}>
                                            {one &&
                                                <div className="btn-share">
                                                    <a onClick={this.viewListPromotion}>
                                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                                    </a>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                }
                {error_promotion == -7 &&
                    <>
                        <div style={{ textAlign: 'center', marginTop: '50px' }} className="post-meta">
                            Xin lỗi! Chương trình không dành cho quý anh chị
                            <br />
                            <br />
                            <a href="/khuyen-mai">
                                <button className="btn-insee btn-insee-bg post-btn">Khuyến mãi</button>
                            </a>
                        </div>

                    </>

                }
            </div>
        )
    }
}

export default withRouter(DetailPromotion)


class InformModal extends React.PureComponent {

    constructor(props) {
        super(props)
        this.popupRef = React.createRef()
        this.justInit = true;
    }

    handleClick = (event) => {
        const { target } = event
        if (!this.popupRef.current.contains(target)) {
            if (!this.justInit) {
                this.props.outClick && this.props.outClick();
            } else {
                this.justInit = false;
            }
        }
    }


    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick)
    }

    render() {
        return (
            <div className="modal-qrcode">
                <div ref={this.popupRef} className="modal-popup">
                    <p>Chương trình khuyến mãi chỉ dành riêng cho thầu/thợ, anh chị vui lòng liên hệ hotline 1800 1718 nếu có thắc mắc</p>
                    <div className="modal-close-btn">
                        <button onClick={this.props.outClick} className="btn-insee btn-insee-bg post-btn btn-small">Đóng</button>
                    </div>
                </div>
            </div>
        )
    }
}