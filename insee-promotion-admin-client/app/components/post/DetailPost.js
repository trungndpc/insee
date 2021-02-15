import React, { Component } from 'react'

class DetailPromotion extends Component {

    componentDidMount() {
        let postId = this.props.postId;
        this.props.appActions.getPromotionById(postId);
    }
    
    render() {
        const promotion = this.props.app.promotion;
        return (
            <div className="loadMore">
                <div className="central-meta item" style={{ display: 'inline-block' }}>
                    <div className="user-post">
                        <div className="friend-info">
                            <div className="post-meta">
                                <img src={'https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/promotion1.png'} alt="" />
                                <div className="description">
                                    <h3 className="post-title-detail">{promotion && promotion.title}</h3>
                                    <p  dangerouslySetInnerHTML={{ __html: `${promotion && promotion.content}` }}>
                                        
                                    </p>
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
