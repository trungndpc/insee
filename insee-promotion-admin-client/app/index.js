/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import Login from '../app/redux/containers/webapp/Login';
import Contractor from './redux/containers/webapp/Contractor';
import Post from './redux/containers/webapp/Post'
import Gift from './redux/containers/webapp/Gift'
import Customer from './redux/containers/webapp/Customer'
import Construction from './redux/containers/webapp/Construction'
import Dashboard from './redux/containers/webapp/Dashboard'
import Match from './redux/containers/webapp/Match'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';
import Introduction from './redux/containers/webapp/Introduction';
import Loyalty from './redux/containers/webapp/Loyalty';
import LeaderBoard from './redux/containers/webapp/LeaderBoard';
import RedeemPoint from './redux/containers/webapp/RedeemPoint';



const store = configureStore()


function RouteApp() {
  let history = useHistory();
  window.pushHistory = function (path) {
    history.push(path);
  }
  return <div></div>
}

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/construction" component={Construction} />
        <Route path="/gift" component={Gift}/>
        <Route path="/post" component={Post} />
        <Route path="/customer" component={Customer} />
        <Route path="/match" component={Match} />
        <Route path="/introduction" component={Introduction} />
        <Route path="/leaderboad" component={LeaderBoard} />
        <Route exact path="/" component={Contractor} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/loyalty" component={Loyalty} />
        <Route path="/redeem-point" component={RedeemPoint} />
      </Switch>
      <RouteApp />
    </Router>
    <Alert stack={{ limit: 3 }} />
  </Provider>,
  document.getElementById('insee-promotion-client')
)
