/**
 * Page: Create Box & Select Flavours
 * Type: Page specific.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  products: [],
  currentState: false,
});

export const getters = {
  hasState(state) {
    return state.currentState !== false;
  },
  flavours(state) {
    return state.products.filter((product) => product.selected);
  },
  flavoursCount(state, getters) {
    return getters.flavours.length;
  },
  currentState(state) {
    return state.currentState;
  },
};

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setCurrentState(state, currentState) {
    state.currentState = currentState;
  },
  toggleProductSelection(state, product) {
    product.selected = !product.selected;
  },
};

export const actions = {
  selectAllFlavours({ commit, state }, selected) {
    const products = state.products.map((p) => {
      const product = {
        ...p,
        selected,
      };

      return product;
    });
    commit('setProducts', products);
  },
};
