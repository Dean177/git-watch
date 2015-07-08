import Immutable from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({
  "C:/Users/Dean/workspace/git-watch-test-repo": { status: "updated" }
});

export default createReducer(initialState, {
  [ActionTypes.Repository.new](state, action) {
    console.log("New repo", action);

    return state;
  }
});