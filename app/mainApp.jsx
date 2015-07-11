import React from 'react';
import Immutable from 'immutable';
import { createStore, composeReducers } from 'redux';
import { Provider } from 'redux/react';

import Repository from './reducers/Repository';

import debug from 'debug';
import '!style!css!less!./styles/app.less';
import routes from './routes/routes';
import Router from 'react-router';


// TODO read from Json file?;
const globalInitialState =  Immutable.fromJS({
  "repositories": {
    "/home/dean/workspace/git-watch-test-repo": {
      "path":"C:/Users/Dean/workspace/git-watch-test-repo",
      "date":1436641325142,
      "status":"updated"
    },
    "/home/dean/workspace/git-watch": {
      "type":"new",
      "path":"/home/dean/workspace/git-watch",
      "date":1436641841142
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
