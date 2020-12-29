import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'

import '../../../resources/css/mobile/bootstrap.min.css';
import '../../../resources/css/mobile/main.css';
import '../../../resources/css/mobile/me.css';
import PhoneStep from './PhoneStep';
import OTPStep from './OTPStep';
import InfoStep from './InfoStep';
import CompletedStep from './CompletedStep';
import Loading from '../../../components/layout/Loading'

class Register extends React.Component {



  render() {
    const data = this.props.app.register;
    return (
      <div>
        {(!data || data.step == 1) && <PhoneStep {...this.props}/>}
        {data && data.step == 2 && <OTPStep {...this.props} />}
        {data &&data.step == 3 && <InfoStep {...this.props} />}
        {data && data.step == 4 && <CompletedStep {...this.props} />}
        <div id="recaptcha-container"></div>
        <Loading {...this.props}/>
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
)(Register)
