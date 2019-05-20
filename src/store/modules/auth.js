/* eslint-disable */
import {
  AUTH_REQUEST,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "@/store/actions/auth"
import router from "./../../router";
import axios from 'axios'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false,
  profile: null
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
      axios.post('http://localhost:9000/.netlify/functions/AuthenticateUser', user).then(res => {
        console.log(res);
        commit(AUTH_SUCCESS, res.data);
        localStorage.setItem("user-token", res.data.metadata.token);
        localStorage.setItem("user", res.data.metadata);
      }).catch(err => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem("user-token");
        reject(err);
        console.log(err)
      })
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
      axios.post('https://v-cosmic-auth.netlify.com/.netlify/functions/CreateNewUser', user).then(res => {
        console.log(res)
        if (res.status == 200) {
          commit(AUTH_SUCCESS)
          router.push('/profile')
        } else {
          commit(AUTH_ERROR)
        }
      }).catch(err => {
        console.log(err)
      })
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
    state.profile = res
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = "error"
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ""
    state.profile = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
