import React, { Component } from 'react'
import { withRouter } from "react-router";
import {
    Link,
} from "react-router-dom";
import { TypePromotion } from '../../components/enum/TypePromotion'
import { UserRole, CONTRUCTOR } from '../../components/enum/UserRole'


class DetailPromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopupModal: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.click2Form = this.click2Form.bind(this)
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

    click2Form() {
        const user = this.props.app.user;
        if (user.roleId == CONTRUCTOR.getRoleId()) {
            const promotion = this.props.app.promotion;
            const one = promotion && promotion.one;
            let url = TypePromotion.getLink2Form(one.typePromotion, one.id)
            this.props.history.push(url)
        } else {
            this.setState({
                showPopupModal: true
            })
        }
    }


    render() {
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        return (
            <div className="loadMore">
                {this.state.showPopupModal && <InformModal outClick={this.toggleModal} />}
                <div className="central-meta item" style={{ display: 'inline-block' }}>
                    <div className="user-post">
                        <div className="friend-info">
                            <div className="post-meta">
                                <img src={one && one.cover} alt="" />
                                <div className="description cke-content">
                                    <div dangerouslySetInnerHTML={{ __html: `${one && one.content}` }}>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    {one && <Link onClick={this.click2Form} >
                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                    </Link>
                                    }
                                </div>
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