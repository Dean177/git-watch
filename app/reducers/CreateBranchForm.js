import Immutable, { Set } from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import createReducer from '../lib/createReducer';
import debug from 'debug';

const logger = debug('git-watch:reducers:CreateBranchForm');


const initialState = Immutable.fromJS({
  branchName: "",
  selectedRepositories: Set.of(),
  errors: []
});

export default createReducer(initialState, {
  [ActionTypes.CreateBranch.enterName](state, action) {
    return state
      .set("branchName", action.name)
      .set("errors", action.errors);
  },

  [ActionTypes.CreateBranch.selectRepository](state, action) {
    const {path, isSelected} = action;

    return state.update("selectedRepositories", (repositories) => {
      return isSelected ? repositories.add(path) : repositories.subtract([path]);
    });
  },

  [ActionTypes.CreateBranch.createdBranch](state, action) {
    return initialState;
  }
});

