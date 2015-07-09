import React from 'react';
import { createStore, composeReducers } from 'redux';
import { Provider } from 'redux/react';

import Repository from './reducers/Repository';
import NewRepo from './components/NewRepo';


// TODO read from Json file;
const globalInitialState = {"C:/Users/Dean/workspace/git-watch-test-repo": { status: "updated" }};
const store = createStore(Repository, globalInitialState);

React.render(
  <Provider {...{ store }} >
    {() => <NewRepo/> }
  </Provider>,
  document.getElementById('content')
);