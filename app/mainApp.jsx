import React from 'react';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers/';
import '!style!css!less!./styles/app.less';
import routes from './routes';
import Router from 'react-router';

const initialState = {
  "Repository": {
    "/home/dean/workspace/git-watch-test-repo": {
      "path": "/home/dean/workspace/git-watch-test-repo",
      "date": 1437325875997,
      "status": "warning",
      "type": "error",
      "error": {
        "code": "WrongBranch",
        "message": "Not currently on the master branch",
        "branchName": "master"
      },
      "branchName": "master"
    },
    "/home/dean/workspace/pool-ladder": {
      "path": "/home/dean/workspace/pool-ladder",
      "date": 1437325876036,
      "status": "warning",
      "type": "error",
      "branchName": "master",
      "error": {
        "code": "WrongBranch",
        "message": "Not currently on the master branch",
        "branchName": "master"
      }
    },
    "/home/dean/workspace/git-watch": {
      "path": "/home/dean/workspace/git-watch",
      "date": 1437325876056,
      "status": "warning",
      "type": "error",
      "error": {
        "code": "DirtyWorkingDirectory",
        "message": "Working directory is dirty",
        "details": [
          ".jshintrc NEW",
          "app/actions/RepositoryActions.js MODIFIED",
          "app/lib/PollRepositories.js MODIFIED",
          "app/mainApp.jsx MODIFIED",
          "app/reducers/AddRepoForm.js MODIFIED",
          "app/reducers/Repository.js MODIFIED",
          "app/RepositoryStatusList/components/RepositoryStatus.jsx MODIFIED",
          "app/RepositoryStatusList/components/RepositoryStatus.less MODIFIED",
          "app/RepositoryStatusList/RepoStatusList.jsx MODIFIED",
          "gulpfile.js MODIFIED",
          "package.json MODIFIED",
          "tests/PollRepositories.spec.js MODIFIED"
        ],
        "branchName": "master"
      },
      "branchName": "master"
    },
    "/home/dean/workspace/electron": {
      "path": "/home/dean/workspace/electron",
      "date": 1437325875978,
      "status": "error",
      "type": "error",
      "error": {
        "code": "OpeningRepository",
        "message": "Couldn't open local repository",
        "details": {}
      }
    }
  },
  "AddRepoForm": {
    "directory": ""
  }
};

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);
const router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

router.run(function (Handler) {
  React.render(
    <Provider {...{ store }} >
      {() => <Handler /> }
    </Provider>,
    document.getElementById('react-root'));
});
