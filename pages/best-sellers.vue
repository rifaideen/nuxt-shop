<template>
  <div class="mt-2">
    <div class="row">
      <div class="col mb-2">
        <b>All Times Best Selling</b>
      </div>
    </div>

    <ListProduct
      :product="product"
      v-for="product in products"
      :key="product.id"
      @add-to-basket="onAddToBasket"
      @increase-quantity="onIncreaseQuantity"
      @decrease-quantity="onDecreaseQuantity"
      :ref="`ListProduct-${product.id}`"
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
</template>

<script>
import dynamicItem from '~/mixins/dynamic-item';

export default {
  name: 'BestSellers',
  middleware: ['store-selection'],
  layout: 'navigationOnly',
  mixins: [dynamicItem],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  // eslint-disable-next-line consistent-return
  async asyncData({ store, $axios, error }) {
    try {
      store.commit('setNavigationTitle', 'Best Sellers');
      const storeID = store.state.store.id;
      const products = $axios.get(`/best-sellers/${storeID}`);
      const items = [products];

      if (store.getters['cart/created']) {
        const cart = store.dispatch('cart/get');
        items.push(cart);
      }

      const results = await Promise.all(items);

      return {
        products: results[0].data.data,
        links: results[0].data.links,
      };
    } catch (e) {
      return error(e);
    }
  },
};
</script>

<style scoped>
</style>
