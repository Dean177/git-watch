import Immutable from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [ActionTypes.Repository.new](state, action) {
    console.log("New repository added", action);
    return state.setIn(['repositories', action.path], action);
  },

  [ActionTypes.Repository.update](state, action) {
    console.log("Repository updated", action);
    return state.setIn(['repositories', action.path], action.status);
  },

  [ActionTypes.Repository.remove](state, action) {
    console.log("Repository updated", action);
    return state.deleteIn(['repositories', action.path]);
  }
});