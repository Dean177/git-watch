import keyMirror from 'keymirror';

export default {
  Repository: keyMirror({
    new: null,
    loading: null,
    update: null,
    delete: null,
    error: null
  }),

  AddRepo: keyMirror({
    chooseDirectory: null,
    addedRepository: null
  }),

  CreateBranch: keyMirror({
    enterName: null,
    selectRepository: null,
    createdBranch: null
  }),

  Navigation: keyMirror({
    routeChange: null
  })
};
