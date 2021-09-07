/**
 * Page: Home Page
 * Type: Page specific.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  data: {},
  isLoaded: false,
  lastLoaded: null,
});

export const getters = {
  sliders(state) {
    return state.data.sliders;
  },
  bestSellers(state) {
    return state.data['best-sellers'];
  },
  seasonalCollections(state) {
    return state.data['seasonal-collections'];
  },
  readyBoxes(state) {
    return state.data['ready-boxes'];
  },
  recentOrders(state) {
    return state.data['recent-orders'];
  },
  favorites(state) {
    return state.data.favorites;
  },
};

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setIsLoaded(state, loaded) {
    state.isLoaded = loaded;
  },
  setLastLoaded(state, storeId) {
    state.lastLoaded = storeId;
  },
};

export const actions = {
  async getData({ commit }, storeId) {
    const { data } = await this.$axios.get(`home/${storeId}`);
    commit('setData', data.data);
    commit('setIsLoaded', true);
    commit('setLastLoaded', storeId);
  },
};
