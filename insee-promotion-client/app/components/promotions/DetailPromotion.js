import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import { TypePromotion } from '../../components/enum/TypePromotion'

class DetailPromotion extends Component {

    componentDidMount() {
        let postId = this.props.postId;
        this.props.appActions.getPromotionById(postId);
    }

    render() {
        const promotion = this.props.app.promotion;
        const one = promotion && promotion.one;
        return (
            <div className="loadMore">
                <div className="central-meta item" style={{ display: 'inline-block' }}>
                    <div className="user-post">
                        <div className="friend-info">
                            <div className="post-meta">
                                <img src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/promotion1.png'} alt="" />
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{ __html: `${one && one.content}` }}>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    {one && <Link to={TypePromotion.getLink2Form(one.typePromotion, one.id)}>
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

export default DetailPromotion
