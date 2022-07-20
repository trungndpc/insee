import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class NotUserPage extends React.Component {

  render() {
    return (
      <div style={{textAlign: 'center', padding: '30px' ,  paddingTop: '100px'}}>
        Anh chị chưa đủ điều kiện để tham gia chương trình
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
)(NotUserPage)
