/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
export const state = () => ({
  city: null,
  cities: [],
  country: null,
  countries: [],
  store: null,
  stores: [],
});

export const mutations = {
  setCity(state, city) { state.city = city; },
  setCities(state, cities) { state.cities = cities; },
  setCountry(state, country) { state.country = country; },
  setCountries(state, countries) { state.countries = countries; },
  setStore(state, payload) {
    state.store = payload;

    // handle the store-id cookie
    if (payload === null) {
      this.$cookies.remove('store-id');
    } else {
      this.$cookies.set('store-id', payload.id);
    }
  },
  setStores(state, stores) { state.stores = stores; },
};

export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    const storeId = app.$cookies.get('store-id');

    if (storeId) {
      await dispatch('getStore', storeId);
    }
  },
  async getCountries({ commit }) {
    const { data } = await this.$axios.get('countries');
    commit('setCountries', data);
  },
  async getCities({ commit }, country) {
    const { data } = await this.$axios.get(`cities/${country}`);
    commit('setCities', data);
  },
  async getStores({ commit }, city) {
    const { data } = await this.$axios.get(`stores/${city}`);
    commit('setStores', data);
  },
  async getStore({ commit }, id) {
    const { data } = await this.$axios.get(`store/${id}`);
    const { store } = data.data;
    commit('setStore', store);
  },
};
