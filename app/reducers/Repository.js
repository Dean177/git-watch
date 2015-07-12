import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import Errors from '../constants/RepositoryErrors';
import Status from '../constants/Status';

import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

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

  [ActionTypes.Repository.update](state, action) {
    console.log("Repository updated", action);
    action.error = null;
    let repository = {
      ...action,
      error: undefined,
      status: action.status || Status.ok,
      date: Date.now()
    };

    return state.mergeIn(['repositories', action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.error](state, action) {
    console.log("Repository updated failed", action);

    let status = getStatusFromError(action.error);
    let repository = {
      ...action,
      date: Date.now(),
      status
    };

    return state.mergeIn(['repositories', action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.remove](state, action) {
    console.log("Repository updated", action);
    return state.deleteIn(['repositories', action.path]);
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