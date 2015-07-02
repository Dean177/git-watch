import {createStore} from '../lib/redux-helpers';
import { Map } from 'immutable';

const initialState = {
  repositories: Map({
    "C:/Users/Dean/workspace/git-watch-test-repo": { status: "updated" }
  })
};

export const RepositoryStore = createStore(initialState, {
  newRepository: (state, action) => {
    console.log("new repository added", action);
    //
    //if(state.repositories.has(action.path)) {
    //  return state;
    //} else {
    //  return this.state.repositories.add();
    //}
  }
});