const state = {
  status: '',
  profile: {}
}

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
