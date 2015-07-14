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

export function repositoryUpdated(path) {
  return {
    type: ActionTypes.Repository.update,
    path: path
  };
}

export function repositoryUpdateFailed(path, error) {
  return {
    type: ActionTypes.Repository.error,
    path: path,
    error: error
  };
}
