import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "@/store/actions/auth"

export default {
  [AUTH_REQUEST]: state => {
    state.authStatus = "loading"
  },
  [AUTH_SUCCESS]: (state, res) => {
    state.authStatus = "success"
    state.profile = res
    state.token = res.metadata.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.authStatus = "error"
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.authStatus = ""
    state.token = ""
    state.profile = {}
    state.hasLoadedOnce = false
  }
}
