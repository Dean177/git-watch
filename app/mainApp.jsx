import React from 'react';
import Immutable from 'immutable';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import * as reducers from './reducers/';
import '!style!css!less!./styles/app.less';
import routes from './routes';
import Router from 'react-router';

const storeCreator = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const store = storeCreator(reducer);
const router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

router.run(function (Handler) {
  React.render(
    <div>
      <Provider {...{ store }} >
        {() => <Handler className="app"/> }
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
    ,
    document.getElementById('react-root'));
});
