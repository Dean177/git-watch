import _ from 'lodash';
import uniqueId from 'uniqueid';

// Create actions that don't need constants
export const createActions = (actionObj) => {
  const baseId = uniqueId();
  return _.zipObject(_.map(actionObj, (actionCreator, key) => {
    const actionId = `${baseId}-${key}`;
    const method = (...args) => {
      const result = actionCreator(...args);

      if (result instanceof Promise) {
        // Promise (async)
        return {
          types: ['BEGIN', 'SUCCESS', 'FAILURE'].map( (state) => `${actionId}-${state}`),
          promise: result
        }
      } else if (typeof result === 'function') {
        // Function (async)
        return (...args) => {
          return {
            type: actionId,
            ...(result(...args) || {})
          };
        };
      } else {
        // Object (sync)
        return {
          type: actionId,
          ...(result || {})
      };
    }
  };
  method._id = actionId;
  return [key, method];
  }));
};

// Get action ids from actions created with `createActions`
export const getActionIds = (actionCreators) => {
  return _.mapValues(actionCreators, (value, key) => {
    return value._id;
  });
};

// Replace switch statements in stores (taken from the Redux README)
export const createStore = (initialState, handlers) => {
  return (state = initialState, action) =>
    handlers[action.type] ?
      handlers[action.type](state, action) :
      state;
};

export function promiseMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...rest } = action;

    if (!promise) { return next(action); }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise.then(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => next({ ...rest, error, type: FAILURE })
    );
  };
}