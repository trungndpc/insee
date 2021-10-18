import React, { Component } from 'react'
import { withRouter } from "react-router";
import { LOYALTY, SHARE_LINK_REGISTRY, TypePromotion } from '../../components/enum/TypePromotion'
import { CONTRUCTOR } from '../../components/enum/UserRole'
import WebUtil from '../../utils/WebUtil'
import PromotionModel from '../../model/PromotionModel'

class DetailPromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopupModal: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.viewDetail = this.viewDetail.bind(this)
        this.onClickDetail = this.onClickDetail.bind(this)
        this.openZaloFormShare = this.openZaloFormShare.bind(this)
    }

    componentDidMount() {
        let postId = this.props.postId;
        this.props.appActions.getPromotionById(postId);
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
            this.props.history.push(url)
        } else {
            this.setState({
                showPopupModal: true
            })
        }
    }

    onClickDetail() {
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        if (one.typePromotion == LOYALTY.type) {
            PromotionModel.startZaloBot(one.id)
            .then(resp => {
                if (resp.error == 0 && resp.data) {
                    window.location.href = "https://zalo.me/" + resp.data;
                }else {
                    this.viewDetail()
                }
            })
        }else {
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
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        const type = one && one.typePromotion;
        return (
            <div className="loadMore">
                {this.state.showPopupModal && <InformModal outClick={this.toggleModal} />}
                <div className="central-meta item" style={{ display: 'inline-block' }}>
                    <div className="user-post">
                        <div className="friend-info">
                            <div className="post-meta">
                                <img src={one && one.cover} alt="" />
                                {one &&
                                    <div className="description cke-content">
                                        <div dangerouslySetInnerHTML={{ __html: `${one.content}` }}>
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
                                {type && type == SHARE_LINK_REGISTRY.type &&
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
                            </div>
                        </div>
                    </div>
                </div>
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