/**
 * Page: Any
 * Type: Page agnostic.
 */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
export const state = () => ({
  city: null,
  cities: [],
  country: null,
  countries: [],
  store: null,
  stores: [],
  device_id: null,
  navigationTitle: null,
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
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      this.$cookies.set('store-id', payload.id, { expires });
    }
  },
  setStores(state, stores) { state.stores = stores; },
  setDeviceId(state, id) {
    state.device_id = id;
    const expires = new Date();
    expires.setDate(expires.getDate() + 365);
    this.$cookies.set('device-id', id, { expires });
  },
  setNavigationTitle(state, title) {
    state.navigationTitle = title;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { app }) {
    const storeId = app.$cookies.get('store-id');
    const cartId = app.$cookies.get('cart-id');
    const token = app.$cookies.get('auth-token');
    let deviceId = app.$cookies.get('device-id');

    if (storeId) {
      await dispatch('getStore', storeId);
    }

    if (cartId) {
      await commit('cart/setId', cartId);
    }

    if (token) {
      await commit('auth/setToken', token);
    }

    if (!deviceId) {
      deviceId = app.$uid();
    }

    await commit('setDeviceId', deviceId);
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
