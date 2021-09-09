<template>
  <div>
    <div class="mt-4 mb-4 p-4 rounded light-bg-container">
      <div class="row mb-2">
        <div class="col-12">
          <b class="orange-color">Search</b>
          <br>
          <sub>Please enter your search keyword.</sub>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12">
          <input type="text" class="form-control" @keypress.enter="search" v-model.trim="keyword">
          <div class="invalid-feedback" v-if="error">{{ error }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button class="btn btn-success btn-block" @click="search">
            <i class="fa fa-search"></i> Search
          </button>
        </div>
      </div>
    </div>

    <div class="mt-2 p-4" v-if="products.length > 0">
      <ListProduct
        :product="product"
        v-for="(product, i) in products"
        :key="product.id"
        @add-to-basket="onAddToBasket"
        @increase-quantity="onIncreaseQuantity"
        @decrease-quantity="onDecreaseQuantity"
        :ref="`ListProduct-${product.id}`"
        v-observe-visibility="i === products.length - 1 ? loadMore : false"
      />
      <CartControls
        :item="selectedItem"
        :existing-item="existingItem"
        v-if="selectedItem !== null"
        @item-updated="onItemUpdated"
        @item-deleted="onItemUpdated"
        :key="'selected-item-' + selectedItem.product_id"
      />
    </div>

    <div class="mt-2 p-4" v-if="loadingMore || searching">
      <ListPlaceholder />
    </div>

    <div class="mt-2" v-if="didSearch && products.length < 1">
      <b-alert show>
        No Results Found. Please try different keywords.
      </b-alert>
    </div>
  </div>
</template>

<script>
import dynamicItem from '~/mixins/dynamic-item';

export default {
  layout: 'navigationOnly',
  mixins: [dynamicItem],
  middleware: ['store-selection'],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
      keyword: '',
      products: [],
      links: [],
      error: null,
      didSearch: false,
      searching: false,
      loadingMore: false,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', 'Search');
  },
  async fetch() {
    // load cart items
    if (this.$store.getters['cart/created']) {
      await this.$store.dispatch('cart/get');
    }
  },
  methods: {
    async search() {
      if (this.keyword.length < 3) {
        this.error = 'Please enter min 3 characters';
        return;
      }

      this.$nuxt.$loading.start();
      this.error = null;
      this.searching = true;
      this.products = [];
      this.links = [];
      const storeID = this.$store.state.store.id;
      const { data } = await this.$axios.get(`/search/${storeID}`, {
        params: { keyword: this.keyword },
      });

      this.products = data.data;
      this.links = data.links;
      this.didSearch = true;
      this.searching = false;
      this.$nuxt.$loading.finish();
    },
    async loadMore(visible) {
      if (!visible) {
        return;
      }

      // eslint-disable-next-line no-prototype-builtins
      if (this.links.hasOwnProperty('next')) {
        this.$nuxt.$loading.start();
        this.loadingMore = true;
        const { data } = await this.$axios.get(this.links.next);
        this.products = this.products.concat(data.data);
        this.links = data.links;
        this.loadingMore = false;
        this.$nuxt.$loading.finish();
      }
    },
  },
};
</script>

<style scoped>
</style>
