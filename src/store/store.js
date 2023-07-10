import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recommendedTracks: [],
    accessToken: '',
    username: '',
    userphoto: '',
  },
  mutations: {
    SET_RECOMMENDED_TRACKS(state, tracks) {
      state.recommendedTracks = tracks;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_USERPHOTO(state, userphoto) {
      state.userphoto = userphoto;
    },
  },
  actions: {
    setRecommendedTracks({ commit }, tracks) {
      commit('SET_RECOMMENDED_TRACKS', tracks);
    },
    setAccessToken({ commit }, token) {
      commit('SET_ACCESS_TOKEN', token);
    },
    setUsername({ commit }, username) {
      commit('SET_USERNAME', username);
    },
    setUserphoto({ commit }, userphoto) {
      commit('SET_USERPHOTO', userphoto);
    },
  },
  getters: {
    getRecommendedTracks(state) {
      return state.recommendedTracks;
    },
    getUsername(state) {
      return state.username;
    },
    getUserphoto(state) {
      return state.userphoto;
    },
    getAccessToken(state) {
      return state.accessToken;
    }
  },
});
