/* eslint-disable import/default */
import React, { Suspense } from 'react'
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

import ContractorInfo from './redux/containers/webapp/ContractorInfo';
import Promotion from './redux/containers/webapp/Promotion'
import Login from './redux/containers/Login'
import IntroConstructionPromotion from './redux/containers/promotion/IntroConstructionPromotion'
import GiftHistory from './redux/containers/webapp/GiftHistory'
import GiftCard from './redux/containers/GiftCard'

import ReportUploadBillConstructionPromotion from './redux/containers/promotion/ReportUploadBillConstructionPromotion'
// const ReportUploadBillConstructionPromotion = React.lazy(() => import('./redux/containers/promotion/ReportUploadBillConstructionPromotion'));
const UploadBillConstructionPromotion = React.lazy(() => import('./redux/containers/promotion/UploadBillConstructionPromotion'));
const Register = React.lazy(() => import('../app/redux/containers/register/index'));


const store = configureStore()

function RouteApp() {
  let history = useHistory();
  window.pushHistory = function (path) {
    history.push(path);
  }
  return <div></div>
}

function UploadBillConstructionPromotionRoute() {
  let { promotionId, constructionId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadBillConstructionPromotion promotionId={promotionId} constructionId={constructionId} />
    </Suspense>
  )
}

function IntroConstructionPromotionRoute() {
  let { promotionId, constructionId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntroConstructionPromotion promotionId={promotionId} constructionId={constructionId} />
    </Suspense>
  )
}

function GiftMessageRoute() {
  let { giftId } = useParams();
  return <GiftCard giftId={giftId} />
}

function APP() {

  return (
    <Switch>
      <Route path="/dang-nhap" >
        <Login />
      </Route>
      <Route path="/dang-ky">
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/:promotionId/cong-trinh-tiep-theo/:constructionId">
        <IntroConstructionPromotionRoute />
      </Route>
      <Route path="/khuyen-mai/:promotionId/cong-trinh-tiep-theo">
        <IntroConstructionPromotionRoute />
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua/:constructionId">
        <UploadBillConstructionPromotionRoute />
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua">
        <UploadBillConstructionPromotionRoute />
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
      <Route path="/lich-su" component={GiftHistory} />
      <Route path="/test" component={ReportUploadBillConstructionPromotion} />
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
