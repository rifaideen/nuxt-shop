/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  authenticated: false,
  token: null,
  user: null,
});

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated && state.token !== null;
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
      this.$cookies.set('auth-token', token, { expires });
    }
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
    return this.$axios.post('/logout', {}, {
      Authorization: `Bearer ${state.token}`,
    });
  },
  authenticate({ commit }, { user, token }) {
    commit('setUser', user);
    commit('setToken', token);
  },
  forget({ commit }) {
    commit('setUser', null);
    commit('setToken', null);
  },
};
