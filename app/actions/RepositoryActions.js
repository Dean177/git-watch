import ActionTypes from '../constants/ActionTypes';
import Status from '../constants/Status';


export function newRepository(path) {
    return {
      type: ActionTypes.Repository.new,
      path: path
    };
}

export function pollRepository(path) {
  return {
    type: ActionTypes.Repository.loading,
    path: path
  };
}

export function repositoryUpdated(path, branchName) {
  return {
    type: ActionTypes.Repository.update,
    path,
    branchName
  };
}

export function repositoryUpdateFailed(path, error) {
  return {
    type: ActionTypes.Repository.error,
    path,
    branchName: error.branchName,
    error
  };
}
