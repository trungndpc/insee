/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Register from '../app/redux/containers/register/index';
import ContractorInfo from './redux/containers/webapp/ContractorInfo';
import Promotion from './redux/containers/webapp/Promotion'
import Login from './redux/containers/Login'

const store = configureStore()
const isLogin = window.isLogin = true;

function APP() {

  return (
    <Switch>
      <Route path="/khuyen-mai" >
        <Promotion />
      </Route>
      {/* {!isLogin &&  */}
        <Route path="/dang-nhap" >
          <Login />
        </Route>
      {/* } */}
      {/* {isLogin &&  */}
        <Route path="/khach-hang" >
          <ContractorInfo />
        </Route>
      {/* } */}
      {/* {!isLogin &&  */}
        <Route path="/dang-ky" component={Register} />
      {/* } */}
    </Switch>
  )
}


render(
  <Provider store={store}>
    <Router>
      <APP />
    </Router>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
