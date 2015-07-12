import keyMirror from 'keymirror'

export default {
  Repository: keyMirror({
    new: null,
    loading: null,
    update: null,
    delete: null
  }),
  Navigation: keyMirror({
    routeChange: null
  })
}