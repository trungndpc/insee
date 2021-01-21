/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";
import Register from '../app/redux/containers/register/index';
import ContractorInfo from './redux/containers/webapp/ContractorInfo';
import Promotion from './redux/containers/webapp/Promotion'
import Login from './redux/containers/Login'
import IntroConstructionPromotion from './redux/containers/promotion/IntroConstructionPromotion'
import Contructions from './redux/containers/webapp/Contructions'
import NowConstruction from './redux/containers/promotion/NowConstruction'
import GiftHistory from './redux/containers/webapp/GiftHistory'
import GiftCard from './redux/containers/GiftCard'

const store = configureStore()
const isLogin = window.isLogin = true;

function RouteApp() {
  let history = useHistory();
  window.pushHistory = function (path) {
    history.push(path);
  }
  return <div></div>
}

function NowConstructionRoute() {
  let { promotionId, constructionId } = useParams();
  return <NowConstruction promotionId={promotionId} constructionId={constructionId} />
}

function IntroConstructionPromotionRoute() {
  let { promotionId } = useParams();
  return <IntroConstructionPromotion promotionId={promotionId} />
}

function GiftMessageRoute() {
  let { giftId } = useParams();
  return <GiftCard giftId={giftId}/>
}

function APP() {

  return (
    <Switch>
      <Route path="/dang-nhap" >
        <Login />
      </Route>
      <Route path="/cong-trinh">
        <Contructions />
      </Route>
      <Route path="/dang-ky" component={Register} />
      <Route path="/khuyen-mai/:promotionId/cong-trinh-tiep-theo">
        <IntroConstructionPromotionRoute />
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua/:constructionId">
        <NowConstructionRoute />
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua">
        <NowConstructionRoute />
      </Route>
      <Route path="/khach-hang" >
        <ContractorInfo />
      </Route>
      <Route path="/khuyen-mai" >
        <Promotion />
      </Route>
      <Route path="/chuc-mung/:giftId">
        <GiftMessageRoute />
      </Route>
      <Route path="/lich-su" component={GiftHistory}/>
      <Route path="/" >
        <ContractorInfo />
      </Route>
    </Switch>
  )
}


render(
  <Provider store={store}>
    <Router>
      <APP />
      <RouteApp />
    </Router>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
