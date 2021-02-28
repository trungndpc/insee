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
import Firebase from '../../../components/Firebase';



class Register extends React.Component {

  constructor(props) {
    super(props)
    this.phone = null
    this.token = null
    this.setPhone = this.setPhone.bind(this)
    this.setToken = this.setToken.bind(this)
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setToken(token) {
    this.token = token
  }

  render() {
    const data = this.props.app.register;
    return (
      <div>
        <Firebase ref={e => this.firebase = e} />
        {data && data.step == 1 && <PhoneStep setPhone={this.setPhone} firebase={this.firebase} {...this.props} />}
        {data && data.step == 2 && <OTPStep setToken={this.setToken} phone={this.phone} firebase={this.firebase} {...this.props} />}
        {data && data.step == 3 && <InfoStep token={this.token} {...this.props} />}
        {data && data.step == 4 && <CompletedStep {...this.props} />}
        <Loading {...this.props} />
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
