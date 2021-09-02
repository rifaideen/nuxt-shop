/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  authenticated: false,
  token: null,
  user: null,
  message: null,
});

export const getters = {
  isAuthenticated(state) {
    return state.authenticated && state.token !== null;
  },
  token(state) {
    return state.token;
  },
  user(state) {
    return state.user;
  },
};
export const mutations = {
  setUser(state, user) {
    state.authenticated = user !== null;
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
    state.authenticated = token !== null;

    if (token === null) {
      this.$cookies.remove('auth-token');
    } else {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      this.$cookies.set('auth-token', token, { path: '/', expires });
    }
  },
  setMessage(state, message) {
    state.message = message;
  },
};
export const actions = {
  signup(context, payload) {
    return this.$axios.post('/signup', payload);
  },
  login(context, payload) {
    return this.$axios.post('/login', payload);
  },
  logout({ state }) {
    this.$axios.setHeader('Authorization', `Bearer ${state.token}`);

    return this.$axios.post('/logout');
  },
  authenticate({ commit }, { user, token }) {
    commit('setUser', user);
    commit('setToken', token);
  },
  forget({ commit }) {
    commit('setUser', null);
    commit('setToken', null);
  },
  pullMessage({ commit, state }) {
    const { message } = state;
    commit('setMessage', null);

    return message;
  },
};
