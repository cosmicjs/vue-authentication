export default {
  appName: process.env.APP_NAME,
  token: localStorage.getItem('user-token') || '',
  hasLoadedOnce: false,
  authStatus: '',
  status: '',
  profile: {}
}
