export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.authStatus,
  appName: state => state.appName,
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile
}
