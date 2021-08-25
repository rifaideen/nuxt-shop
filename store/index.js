export const state = () => ({
    city: null,
    cities: [],
    country: null,
    countries: [],
    store: null,
    stores: [],
});

export const mutations = {
    setCity: (state, city) => state.city = city,
    setCities: (state, cities) => state.cities = cities,
    setCountry: (state, country) => state.country = country,
    setCountries: (state, countries) => state.countries = countries,
    setStore: (state, store) => state.store = store,
    setStores: (state, stores) => state.stores = stores,
};

export const actions = {
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
};