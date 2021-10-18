import React, { Component } from 'react'
import PhoneCardGiftModal from './PhoneCardGiftModal'
import PromotionModel from '../../../model/PromotionModel'
import { CARD_PHONE, VOUCHER } from '../../enum/TypeGift'
import VoucherGiftModal from './VoucherGiftModal'

class GiftModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            promotion: null,
            customerId: this.props.customerId,
            constructionId: this.props.constructionId,
            predictId: this.props.predictId,
            loyaltyId: this.props.loyaltyId
        }
        this.giftRef = null;
        this.loadPromotion = this.loadPromotion.bind(this)
        this.callback = this.callback.bind(this)
    }

    open(props) {
        if (props) {
            this.loadPromotion(props.promotionId)
            this.setState({
                promotionId: props.promotionId,
                constructionId: props.constructionId,
                customerId: props.customerId,
                predictId: props.predictId,
                loyaltyId: props.loyaltyId,
                isOpen: true
            }, () => {
                this.giftRef && this.giftRef.open();
            })
        }else {
            this.giftRef && this.giftRef.open();
        }
    }


    callback() {
        this.props.callback && this.props.callback();
        this.setState({ isOpen: false })
    }

    componentDidMount() {
        this.props.promotionId && this.loadPromotion(this.props.promotionId);
    }

    loadPromotion(promotionId) {
        PromotionModel.get(promotionId)
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({ promotion: resp.data })
                }
            })
    }


    render() {
        const customerId = this.state.customerId;
        const promotion = this.state.promotion;
        const constructionId = this.state.constructionId;
        const predictId = this.state.predictId;
        const loyaltyId = this.state.loyaltyId;
        return (
            <div>
                {promotion && customerId && promotion.typeGift == CARD_PHONE.getType()
                    && <PhoneCardGiftModal
                        isOpen={this.state.isOpen}
                        callback={this.callback}
                        ref={e => this.giftRef = e}
                        customerId={customerId}
                        loyaltyId={loyaltyId}
                        maxValue={this.props.maxValue}
                        constructionId={constructionId}
                        predictId={predictId} />}
                {promotion && customerId && promotion.typeGift == VOUCHER.getType()
                    && <VoucherGiftModal
                        isOpen={this.state.isOpen}
                        callback={this.callback}
                        ref={e => this.giftRef = e}
                        customerId={customerId}
                        loyaltyId={loyaltyId}
                        constructionId={constructionId}
                        predictId={predictId} />}
            </div>
        )
    }
}

export default GiftModal

