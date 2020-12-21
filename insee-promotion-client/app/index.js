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

const store = configureStore()
function ContractorInfoRoute() {
  let { id } = useParams();
  return <ContractorInfo id={id} />
};

function PromotionRoute() {
  let { id } = useParams();
  if (!id) {
    id = 1005;
  }
  return <Promotion id={id} />
}


render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/khuyen-mai" >
          <PromotionRoute />
        </Route>
        <Route exact path="/khach-hang/:id" >
          <ContractorInfoRoute />
        </Route>
        <Route path="/dang-ky" component={Register} />
        <Route path="/" >
          <PromotionRoute />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
