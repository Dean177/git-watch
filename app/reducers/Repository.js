import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import Errors from '../constants/RepositoryErrors';
import Status from '../constants/Status';

import createReducer from '../lib/createReducer';

// TODO read from json file?
const initialState = Immutable.fromJS({
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
});

export default createReducer(initialState, {
  [ActionTypes.Repository.new](state, action) {
    console.log("New repository added", action);
    let repository = {
      ...action,
      status: Status.ok,
      date: Date.now()
    };

    return state.setIn(['repositories', action.path], Immutable.fromJS(repository));
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
    console.log("Repository updated failed", action);
    let status = getStatusFromError(action.error);
    let repository = {
      ...action,
      date: Date.now(),
      status
    };

    return state.mergeIn([action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.remove](state, action) {
    console.log("Repository updated", action);
    return state.deleteIn([action.path]);
  }
});

function getStatusFromError(error) {
  switch (error.code) {
    case Error.DirtyWorkingDirectory:
    case Error.WrongBranch:
      return Status.warning;
    default:
      return Status.error;
  }
}
