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
import History from './redux/containers/webapp/History'
import Customer from './redux/containers/webapp/Customer'
import Construction from './redux/containers/webapp/Construction'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';



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
        <Route path="/history" component={History}/>
        <Route path="/post" component={Post} />
        <Route path="/customer" component={Customer} />
        <Route exact path="/" component={Contractor} />
        <Route path="/login" component={Login} />
      </Switch>
      <RouteApp />
    </Router>
    <Alert stack={{ limit: 3 }} />
  </Provider>,
  document.getElementById('insee-promotion-client')
)
