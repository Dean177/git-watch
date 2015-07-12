import ActionTypes from './ActionTypes';

export function newRepository(path) {
    return {
      type: ActionTypes.Repository.new,
      path: path,
      date: Date.now(),
      status: "Up to date"
    };
}