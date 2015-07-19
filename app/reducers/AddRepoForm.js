import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';

import createReducer from '../lib/createReducer';


// TODO read from json file?
const initialState = Immutable.fromJS({
  directory: ""
});

export default createReducer(initialState, {
  [ActionTypes.AddRepo.chooseDirectory](state, action) {
    console.log("Selected directory", action);

    return state.set("directory", action.path);
  }

});

