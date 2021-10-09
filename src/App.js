import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

export default function App() {
  return (
    <Provider store={ store }>
      <HashRouter>
        <Switch>
          <Route path='/register' component={ Register } />
          <Route path='/login' component={ Login } />
          <Route component={ Main } />
        </Switch>
      </HashRouter>
    </Provider>
  );
}
