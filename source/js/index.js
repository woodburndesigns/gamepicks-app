import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store.js';
import Main from './components/Main';
import '../scss/app.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Provider store={ store }>
      <Router>
        <Route component={ Main } />
      </Router>
    </Provider>
  , elem);
});