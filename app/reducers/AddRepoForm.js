import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import createReducer from '../lib/createReducer';
import debug from 'debug';

const logger = debug('git-watch:reducers:AddRepoFrom');


const initialState = Immutable.fromJS({
  directory: ""
});

export default createReducer(initialState, {
  [ActionTypes.AddRepo.chooseDirectory](state, action) {
    logger("Selected directory", action);
    return state.set("directory", action.path);
  },

  [ActionTypes.AddRepo.addedRepository](state, action) {
    return initialState;
  }
});

