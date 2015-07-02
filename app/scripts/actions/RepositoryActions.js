import { createActions } from '../lib/redux-helpers';

export const RepositoryActions  = createActions({
  newRepository(path) {
    return {
      path: path,
      date: Date.now()
    };
  }
});