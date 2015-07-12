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
    type: ActionTypes.Repository.update,
    path: path,
    status: Status.loading
  };
}

export function repositoryUpdated(path) {
  return {
    type: ActionTypes.Repository.update,
    path: path,
    status: Status.ok
  };
}

export function repositoryUpdateFailed(path, error) {
  return {
    type: ActionTypes.Repository.error,
    path: path,
    error: error
  };
}

