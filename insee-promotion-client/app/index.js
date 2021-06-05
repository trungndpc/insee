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
import GiftHistory from './redux/containers/webapp/GiftHistory'
import DetailUploadBillPromotion from '../app/redux/containers/promotion/DetailUploadBillPromotion'
import DetailIntroConstructionPromotion from '../app/redux/containers/promotion/DetailIntroConstructionPromotion'
import ModuleLoading from './components/layout/ModuleLoading'
import ReferralCodeStep from './redux/containers/register/ReferralCodeStep'
import Retailers from './redux/containers/webapp/Retailers'
import PredictFootbalPromotion from './redux/containers/promotion/PredictFootbalPromotion'

const UploadBillPromotion = React.lazy(() => import('./redux/containers/promotion/UploadBillPromotion'));
const Register = React.lazy(() => import('../app/redux/containers/register/index'));
const IntroConstructionPromotion = React.lazy(() => import('./redux/containers/promotion/IntroConstructionPromotion'));

import './resources/css/mobile/bootstrap.min.css';
import './resources/css/mobile/main.css';
import './resources/css/mobile/me.css';
import Gift from './redux/containers/gift'

const store = configureStore()

function RouteApp() {
  let history = useHistory();
  window.pushHistory = function (path) {
    history.push(path);
  }
  return <div></div>
}

function APP() {

  return (
    <Switch>
      <Route path="/dang-nhap" >
        <Login />
      </Route>
      <Route path="/dang-ky">
        <Suspense fallback={<ModuleLoading />}>
          <Register />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/:promotionId/cong-trinh-tiep-theo/:constructionId">
        <Suspense fallback={<ModuleLoading />}>
          <IntroConstructionPromotion />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/:promotionId/cong-trinh-tiep-theo">
        <Suspense fallback={<ModuleLoading />}>
          <IntroConstructionPromotion />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/cong-trinh-tiep-theo/:constructionId">
        <DetailIntroConstructionPromotion />
      </Route>
      <Route path="/khuyen-mai/up-hoa-don-nha-qua/:constructionId">
        <DetailUploadBillPromotion />
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua/:constructionId">
        <Suspense fallback={<ModuleLoading />}>
          <UploadBillPromotion />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/:promotionId/du-doan-ket-qua-bong-da">
        <Suspense fallback={<ModuleLoading />}>
          <PredictFootbalPromotion />
        </Suspense>
      </Route>
      <Route path="/khuyen-mai/:promotionId/up-hoa-don-nha-qua">
        <Suspense fallback={<ModuleLoading />}>
          <UploadBillPromotion />
        </Suspense>
      </Route>
      <Route path="/khach-hang" >
        <ContractorInfo />
      </Route>
      <Route path="/khuyen-mai" >
        <Promotion />
      </Route>
      <Route path="/chuc-mung/:giftId">
        <Gift />
      </Route>
      <Route path="/lich-su" component={GiftHistory} />
      <Route path="/ma-gioi-thieu" component={ReferralCodeStep} />
      <Route path="/ds-cua-hang">
        <Retailers />
      </Route>
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
