<template>
  <div class="mt-2">
    <ListProduct
      :product="product"
      v-for="product in products"
      :key="product.id"
      :has-favourite="false"
      id-attribute="product_id"
      @add-to-basket="onAddToBasket"
      @increase-quantity="onIncreaseQuantity"
      @decrease-quantity="onDecreaseQuantity"
      :ref="`ListProduct-${product.product_id}`"
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
  middleware: ['store-selection', 'authenticated'],
  layout: 'navigationOnly',
  mixins: [dynamicItem],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  async asyncData({
    $axios, store, error,
  }) {
    try {
      store.commit('setNavigationTitle', 'Recently Ordered');
      const storeID = store.state.store.id;
      const products = $axios.get(`recently-ordered-items/${storeID}`);
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
      if (e.isAxiosError) {
        return error({
          statusCode: e.response.status,
          message: e.response.statusText,
        });
      }

      return error(e);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
