/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import Register from '../app/redux/containers/register/index';
import ContractorInfo from './redux/containers/webapp/ContractorInfo';
import Promotion from './redux/containers/webapp/Promotion'
import Gift from './redux/containers/webapp/Gift'
import Verification from './redux/containers/webapp/Verification'
import Customer from './redux/containers/webapp/Customer'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';



const store = configureStore()
function ContractorInfoRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <ContractorInfo id={id} />
};


function PromotionRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <Promotion id={id} />
}

function GiftRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <Gift id={id} />
}

function VerificationRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <Verification id={id} />
}

function CustomerRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <Customer id={id} />
}

function RouteApp() {
  let history = useHistory();
  console.log(history)
  window.pushHistory = function (path) {
    console.log(history)
    history.push(path);
  }
  return <div></div>
}

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" >
          <ContractorInfoRoute />
        </Route>
        <Route path="/promotion" >
          <PromotionRoute />
        </Route>
        <Route path="/gift" >
          <GiftRoute />
        </Route>
        <Route path="/verify">
          <VerificationRoute />
        </Route>
        <Route path="/customer">
          <CustomerRoute />
        </Route>
        <Route path="/register" component={Register} />
      </Switch>
      <RouteApp />

    </Router>
    <Alert stack={{ limit: 3 }} />
  </Provider>,
  document.getElementById('insee-promotion-client')
)
