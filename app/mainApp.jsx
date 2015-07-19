import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Router, Route }  from 'react-router/modules';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';

import * as reducers from './reducers/';
import initialState from './git-watch.json';
import '!style!css!less!./styles/app.less';

import RepoStatus from './RepositoryStatusList/RepoStatusList';
import AddRepo from './AddRepository/AddRepository';
import Settings from './Settings/Settings';


const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers
});
const store = createStore(reducer, initialState);


import BrowserHistory from 'react-router/modules/BrowserHistory';
import History from 'react-router/modules/History';

const history = new BrowserHistory();
console.log(history instanceof  History);

React.render((
  <Router history={history}>
    <Route component={reduxRouteComponent(store)} >
      <Route path="/" name="repo-status" component={RepoStatus} >
        <Route path="add-repo" name="add-repo" component={AddRepo} />
        <Route path="settings" name="settings" component={Settings} />
      </Route>
    </Route>
  </Router>
  ),
  document.getElementById('react-root')
);

