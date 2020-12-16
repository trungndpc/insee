/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import { BrowserRouter } from 'react-router-dom'
import { withRouter, Switch, Route } from 'react-router-dom'
import Home from './redux/containers/Home';
import Register from '../app/redux/containers/register/index';




const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
