import { settings } from "@/settings"

export default {
  appName: settings.APP_NAME,
  token: localStorage.getItem('user-token') || '',
  hasLoadedOnce: false,
  authStatus: '',
  status: '',
  profile: {}
}
