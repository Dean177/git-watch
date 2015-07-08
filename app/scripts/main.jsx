import React from 'react';
import { createStore, composeReducers } from 'redux';
import { Provider } from 'redux/react';
import * as reducers from './reducers';

import NewRepo from './components/NewRepo';


const globalInitialState = {}; // TODO read from Json file;
const Store = createStore(composeReducers(reducers), globalInitialState);

React.render(
  <Provider {...{ Store }} >
    {() => <NewRepo/> }
  </Provider>,
  document.getElementById('content')
);