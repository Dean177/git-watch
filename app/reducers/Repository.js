import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import Errors from '../constants/RepositoryErrors';
import Status from '../constants/Status';

import createReducer from '../lib/createReducer';

// TODO read from json file?
const initialState = Immutable.fromJS({
    "/home/dean/workspace/git-watch-test-repo": {
      "path": "/home/dean/workspace/git-watch-test-repo",
      "date": 1436997985724,
      "status": "error",
      "message": "",
      "type": "error",
      "error": {
        "code": "AuthenticationError",
        "message": "Couldn't fetch from remote, is ssh-agent running",
        "details": {}
      }
    },
    "/home/dean/workspace/pool-ladder": {
      "path": "/home/dean/workspace/pool-ladder",
      "date": 1436997986210,
      "status": "ok",
      "message": ""
    },
    "/home/dean/workspace/git-watch": {
      "path": "/home/dean/workspace/git-watch",
      "date": 1436997984670,
      "status": "error",
      "message": "",
      "type": "error",
      "error": {
        "code": "DirtyWorkingDirectory",
        "message": "Working directory is dirty",
        "details": [
          ".jshintrc NEW",
          "app/RepositoryStatusList/components/RepositoryStatus.jsx MODIFIED",
          "app/RepositoryStatusList/RepoStatusList.jsx MODIFIED",
          "app/styles/app.less MODIFIED",
          "app/styles/colors.less MODIFIED"
        ]
      }
    },
    "/home/dean/workspace/electron": {
      "path": "/home/dean/workspace/electron",
      "date": 1436997984608,
      "status": "loading",
      "message": "",
      "type": "error",
      "error": {
        "code": "OpeningRepository",
        "message": "Couldn't open local repository",
        "details": {}
      }
    }
});

export default createReducer(initialState, {
  [ActionTypes.Repository.new](state, action) {
    console.log("New repository added", action);
    let repository = {
      ...action,
      status: Status.new,
      date: Date.now()
    };

    return state.setIn([action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.loading](state, action) {
    console.log("Repository loading", action);
    let repositoryUpdate = {
      status: Status.loading,
      date: Date.now()
    };

    return state.mergeIn([action.path], Immutable.fromJS(repositoryUpdate));
  },

  [ActionTypes.Repository.update](state, action) {
    console.log("Repository updated", action);
    let repositoryUpdate = {
      status: Status.ok,
      date: Date.now()
    };

    return state.mergeIn([action.path], repositoryUpdate);
  },

  [ActionTypes.Repository.error](state, action) {
    let status = getStatusFromError(action.error);
    let repository = {
      ...action,
      status: status,
      date: Date.now()
    };
    console.log("Repository updated failed", repository);
    return state.mergeIn([action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.remove](state, action) {
    console.log("Repository updated", action);
    return state.deleteIn([action.path]);
  }
});

function getStatusFromError(error) {
  switch (error.code) {
    case Errors.DirtyWorkingDirectory:
      return Status.warning;
    case Errors.WrongBranch:
      return Status.warning;
    default:
      return Status.error;
  }
}
