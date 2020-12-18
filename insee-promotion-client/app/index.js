/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configure-store'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Register from '../app/redux/containers/register/index';
import Home from './redux/containers/webapp/index';




const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/khach-hang/:id" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
