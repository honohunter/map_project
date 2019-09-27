/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/app/app';
import Login from './components/login/login';
import Signup from './components/signup/singup';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </>
  </Router>,
  document.getElementById('app'),
);

module.hot.accept();
