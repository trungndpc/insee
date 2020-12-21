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
import Home from './redux/containers/webapp/index';




const store = configureStore()
function HomeRoute() {
  let {id} = useParams();
  return <Home id={id}/>
};

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/khach-hang/:id" >
          <HomeRoute />
        </Route>
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('insee-promotion-client')
)
