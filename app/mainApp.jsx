import React from 'react';
import Immutable from 'immutable';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers/';
import '!style!css!less!./styles/app.less';
import routes from './routes';
import Router from 'react-router';

const reducer = combineReducers(reducers);
const store = createStore(reducer, {});
const router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

router.run(function (Handler) {
  React.render(
    <Provider {...{ store }} >
      {() => <Handler /> }
    </Provider>,
    document.getElementById('react-root'));
});
