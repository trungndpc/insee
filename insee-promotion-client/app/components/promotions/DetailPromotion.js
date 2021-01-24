import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";

class DetailPromotion extends Component {

    componentDidMount() {
        let postId = this.props.postId;
        this.props.appActions.getPromotionById(postId);
    }

    render() {
        const promotion = this.props.app.promotion;
        const pathGoToPromotion = '/khuyen-mai/' + this.props.postId + '/' + ((promotion && promotion.typePromotion == 1 ) ? 'cong-trinh-tiep-theo' : 'up-hoa-don-nha-qua')
        console.log(pathGoToPromotion)
        return (
            <div className="loadMore">
                <div className="central-meta item" style={{ display: 'inline-block' }}>
                    <div className="user-post">
                        <div className="friend-info">
                            <div className="post-meta">
                                <img src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/promotion1.png'} alt="" />
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{ __html: `${promotion && promotion.content}` }}>
                                    </div>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Link to={pathGoToPromotion}>
                                        <button className="btn-insee btn-insee-bg post-btn">Tham gia ngay</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailPromotion
