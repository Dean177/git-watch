import React, { Component } from 'react';

import { Provider } from 'redux/react';
import { createRedux, createDispatcher, composeStores } from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';
import { promiseMiddleware } from './lib/redux-helpers';

import RepositoryStore from './stores/RepositoryStore';

import NewRepo from './components/NewRepo';

const dispatcher = createDispatcher(
  composeStores({ RepositoryStore }),
  getState => [promiseMiddleware(), thunkMiddleware(getState)]
);

const redux = createRedux(dispatcher);


export default class AppFlux extends Component {
  render() {
    return (
      <Provider redux={redux}>
        {() =>
          <NewRepo/>
        }
      </Provider>
    );
  }
}