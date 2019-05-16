/* eslint-disable */
import {
  AUTH_REQUEST,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "@/store/actions/auth"
import router from "./../../router";

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      // Login request
      commit(AUTH_REQUEST);
      // apiCall({ url: api_routes.user.login, data: user, method: "post" })
      //   .then(resp => {
      //     localStorage.setItem("user-token", resp.token);
      //     // Here set the header of your ajax library to the token value.
      //     // example with axios
      //     // axios.defaults.headers.common['Authorization'] = resp.token
      //     commit(AUTH_SUCCESS, resp);
      //     dispatch(USER_REQUEST);
      //     resolve(resp);
      //   })
      //   .catch(err => {
      //     commit(AUTH_ERROR, err);
      //     localStorage.removeItem("user-token");
      //     reject(err);
      //   });
    });
  },
  [AUTH_SIGNUP]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      //  POST JSON: { fullname: '', email: '', password: ''}
      // ROOT/.netlify/functions/CreateNewUser
      // Create User Account
      // axios({ url: api_routes.user.signup, data: user, method: "post" })
      //   .then(resp => {
      //     resolve(resp)
      //   })
      //   .catch(err => {
      //     reject(err)
      //   })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      // Sign out user
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      router.push('/login')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading"
  },
  [AUTH_SUCCESS]: (state, res) => {
    state.status = "success"
    state.token = res.token
    state.hasLoadedOnce = true
    Event.$emit("user-authenticated")
  },
  [AUTH_ERROR]: state => {
    state.status = "error"
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ""
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
