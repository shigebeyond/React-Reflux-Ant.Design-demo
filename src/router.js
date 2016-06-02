import React from 'react';
import {Router, Route, IndexRedirect, IndexRoute, Redirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history';

import App from './views/App';
import Home from './views/Home';
import Login from './views/Login';
import Reg from './views/Reg';
import UhOh from './views/404';

import {getCookie} from './utils';

const history = useRouterHistory(createHistory)({ basename: '' })

const checkLogin = function (next, replace, callback) {
  const isLoggedIn = !!getCookie('uid')
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

// 开放router，可以通过 import {history} from '.router' 来获得history对象
export default (<Router history={history}>
    <Route path="/" component={App} onEnter={checkLogin}>
      {/* 当 url 为/时渲染 Home */}
      <IndexRoute component={Home} />
    </Route>
    <Route path="login" component={Login}/>
    <Route path="reg" component={Reg}/>
    <Route name="404" path="/404" component={ UhOh } />
    {/* Redirects */}
    <Redirect from="*" to="/404" />
  </Router>
);
