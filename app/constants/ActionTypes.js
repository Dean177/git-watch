import keyMirror from 'keymirror'

export default {
  Repository: keyMirror({
    new: null,
    poll: null,
    update: null,
    delete: null,
    error: null
  }),
  Navigation: keyMirror({
    routeChange: null
  })
}
