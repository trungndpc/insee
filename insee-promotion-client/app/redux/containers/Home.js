import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class Home extends React.Component {

  render() {
    return (
      <div>
        HOME
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
)(Home)
