import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { withRouter } from 'react-router';
import FormLayout from '../../../components/layout/FormLayout'
import Loading from '../../../components/layout/Loading'
import {TypeGift, CARD_PHONE_TYPE_GIFT, LUCKY_ROTATION_TYPE_GIFT, VOUCHER_TYPE_GIFT} from '../../../components/enum/TypeGift'
import LuckyRotation  from '../gift/LuckyRotation'
import PhoneCardGift from '../gift/PhoneCardGift'
import VoucherGift from '../gift/VoucherGift'

class Gift extends React.Component {

    constructor(props) {
        super(props)
        let params = this.props.match && this.props.match.params;
        this.state = {
            errorMsg: null,
            giftId : params && params.giftId
        }
    }

    componentDidMount() {
        this.props.appActions.getCustomer();
        this.props.appActions.getGiftById(this.state.giftId);
    }


    render() {
        const gift = this.props.app.gift;
        var type = gift && TypeGift.findByType(gift.type)
        return (
            <FormLayout {...this.props}>
                {type == LUCKY_ROTATION_TYPE_GIFT && <LuckyRotation giftId={this.state.giftId} {...this.props} />}
                {type == CARD_PHONE_TYPE_GIFT && <PhoneCardGift giftId={this.state.giftId} {...this.props} />}
                {type == VOUCHER_TYPE_GIFT && <VoucherGift giftId={this.state.giftId} {...this.props} /> }
                <Loading {...this.props} />
            </FormLayout>
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
)(withRouter(Gift))

