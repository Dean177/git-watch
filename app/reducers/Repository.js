import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import Errors from '../constants/RepositoryErrors';
import Status from '../constants/Status';
import createReducer from '../lib/createReducer';
import debug from 'debug';

const logger = debug('git-watch:reducers:Repository');

export default createReducer({}, {
  [ActionTypes.Repository.new](state, action) {
    logger("New repository added", action);
    let repository = {
      ...action,
      status: Status.new,
      date: Date.now()
    };

    return state.setIn([action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.loading](state, action) {
    logger("Repository loading", action);
    let repositoryUpdate = {
      status: Status.loading,
      date: Date.now()
    };

    return state.mergeIn([action.path], Immutable.fromJS(repositoryUpdate));
  },

  [ActionTypes.Repository.update](state, action) {
    logger("Repository updated", action);
    let repositoryUpdate = {
      status: Status.ok,
      branchName: action.branchName,
      error: {},
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

    logger("Repository updated failed", repository);
    return state.mergeIn([action.path], Immutable.fromJS(repository));
  },

  [ActionTypes.Repository.remove](state, action) {
    logger("Repository updated", action);
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
