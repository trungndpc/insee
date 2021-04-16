import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { withRouter } from 'react-router';
import FormLayout from '../../../components/layout/FormLayout'
import Loading from '../../../components/layout/Loading'
import TypeGift from '../../../components/enum/T'

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
        // this.props.appActions.getCustomer();
        this.props.appActions.getGiftById(this.state.giftId);
    }


    render() {
        const gift = this.props.app.gift;
        const type = gift && gift.type
        return (
            <FormLayout {...this.props}>
                
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

