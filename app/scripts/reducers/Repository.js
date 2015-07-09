import Immutable from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [ActionTypes.Repository.new](state, action) {
    console.log("New repository added", action);

    return state.set(action.path, {status: "none"});
  }
});