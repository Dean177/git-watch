import React from 'react';
import Immutable from 'immutable';
import { createStore, composeReducers } from 'redux';
import { Provider } from 'redux/react';

import Repository from './reducers/Repository';

import '!style!css!less!./styles/app.less';
import routes from './routes/routes';
import Router from 'react-router';


// TODO read from Json file?;
const globalInitialState =  Immutable.fromJS({
  "repositories": {
    "/home/dean/workspace/git-watch-test-repo": {
      "path":"/home/dean/workspace/git-watch-test-repo",
      "date":1436641325142,
      "status": "ok",
      "message": ""
    },
    "/home/dean/workspace/pool-ladder": {
      "path": "/home/dean/workspace/pool-ladder",
      "date":1436641841142,
      "status": "warning",
      "message": ""
    },
    "/home/dean/workspace/git-watch": {
      "path":"/home/dean/workspace/git-watch",
      "date":1436641841142,
      "status": "error",
      "message": ""
    },
    "/home/dean/workspace/electron": {
      "path":"/home/dean/workspace/electron",
      "date":1436641841142,
      "status": "loading",
      "message": ""
    }
  }
});

const store = createStore(Repository, globalInitialState);

// we can create a router before 'running' it
const router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

window.location.hash = '/';

router.run(function (Handler) {
  React.render(
    <Provider {...{ store }} >
      {() => <Handler /> }
    </Provider>,
    document.getElementById('react-root'));
});
