/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  data: null,
  id: null,
  bestSellers: [],
  isGift: false,
  deliveryLocation: null,
  giftRecipient: null,
});

export const getters = {
  // to check if cart is created or not
  created(state) {
    return state.id !== null;
  },
  id(state) {
    return state.id;
  },
  cart(state) {
    return state.data?.cart;
  },
  items(state) {
    return state.data?.items;
  },
  hasItems(state, getters) {
    return getters.items && getters.items.length > 0;
  },
  bestSellers(state) {
    const ids = [];

    if (state.data?.items.length > 0) {
      state.data.items.forEach(item => {
        if (item.product_id) {
          ids.push(item.product_id);
        }
      });
    }

    return state.bestSellers.filter((item) => ids.indexOf(item.id) === -1);
  },
  getItemByProductId: (state) => (id) => {
    if (state.data === null || state.data.items.length === 0) {
      return undefined;
    }

    return state.data.items.find((item) => (item.product_id === id));
  },
};

export const mutations = {
  // set entire cart data including cart and itens
  setData(state, data) {
    state.data = data;
  },
  setId(state, id) {
    state.id = id;

    if (id === null) {
      this.$cookies.remove('cart-id');
    } else {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      this.$cookies.set('cart-id', id, { path: '/', expires });
    }
  },
  setBestSellers(state, bestSellers) {
    state.bestSellers = bestSellers;
  },
  setIsGift(state, isGift) {
    state.isGift = isGift;
  },
  setDeliveryLocation(state, deliveryLocation) {
    state.deliveryLocation = deliveryLocation;
  },
  setGiftRecipient(state, giftRecipient) {
    state.giftRecipient = giftRecipient;
  }
};

export const actions = {
  // cart details
  async get({ commit, state, rootState }) {
    const { data } = await this.$axios.get(`/cart/${state.id}?device_id=${rootState.device_id}`);
    commit('setData', data.data);
  },
  // create cart
  async create({ commit, rootState }) {
    const payload = {
      device_id: rootState.device_id,
      store_id: rootState.store.id,
    };
    const { data } = await this.$axios.post('/cart', payload);
    commit('setId', data.data.cart_id);
  },
  // delete cart
  async delete({ commit, state, rootState }) {
    const payload = {
      device_id: rootState.device_id,
      cart_id: state.id,
    };
    await this.$axios.delete('/cart', { data: payload });
    commit('setId', null);
  },
  // add to cart / update cart item
  add({ state, rootState }, payload) {
    const data = {
      cart_id: state.id,
      device_id: rootState.device_id,
      store_id: rootState.store.id,
      ...payload,
    };

    return this.$axios.post('/add-to-cart', data);
  },
  // view individual cart item by product id
  viewItem({ state, rootState }, productId) {
    const data = {
      device_id: rootState.device_id,
      cart_id: state.id,
      product_id: productId,
    };

    return this.$axios.get('/cart-item', { params: data });
  },
  // remove individual cart item by product id
  removeItem({ state, rootState }, productId) {
    const data = {
      device_id: rootState.device_id,
      cart_id: state.id,
      product_id: productId,
    };

    return this.$axios.delete('/remove-from-cart', { data });
  },
  // remove saved item
  removeSavedItem(context, id) {
    return this.$axios.delete(`/remove-saved-item/${id}`);
  },
  // save cart item for later retrieval
  saveForLater(context, id) {
    return this.$axios.post(`/save-for-later/${id}`);
  },
  // move saved item to cart
  moveToCart(context, { item, cart }) {
    return this.$axios.post(`/move-to-cart/${item}/${cart}`);
  },
  // get best sellers
  async getBestSellers({ commit, getters, rootState }) {
    const { data } = await this.$axios.get(`/best-sellers/${rootState.store.id}`);
    commit('setBestSellers', data.data);
  },
  async clearCart({ commit }) {
    commit('setId', null);
    commit('setData', null);
  }
};
