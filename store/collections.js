/**
 * Page: Collections
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
  normal(state) {
    return state.data.normal;
  },
  mixed(state) {
    return state.data.mixed;
  },
  events(state) {
    return state.data.events;
  },
  boxes(state) {
    return state.data.boxes;
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
    /**
     * The below APIs are called.
     * 1, Sliders API
     * 2, Collections API: type = mixed, event, box
     */
    const sliders = this.$axios.get(`sliders/${storeId}`);
    const normal = this.$axios.get('collections', {
      params: {
        type: 'normal',
        store_id: storeId,
      },
    });
    const mixed = this.$axios.get('collections', {
      params: {
        type: 'mixed',
        store_id: storeId,
      },
    });
    const events = this.$axios.get('collections', {
      params: {
        type: 'event',
        store_id: storeId,
      },
    });
    const boxes = this.$axios.get('collections', {
      params: {
        type: 'box',
        store_id: storeId,
      },
    });

    const results = await Promise.all([sliders, normal, mixed, events, boxes]);
    const data = {
      sliders: results[0].data.data.sliders,
      normal: results[1].data.data,
      mixed: results[2].data.data,
      events: results[3].data.data,
      boxes: results[4].data.data,
    };

    commit('setData', data);
    commit('setIsLoaded', true);
    commit('setLastLoaded', storeId);
  },
};
