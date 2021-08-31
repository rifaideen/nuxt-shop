<template>
  <div>
    <h1 @click="$goBack">
      <i class="fa fa-chevron-left"></i>
      {{ collection.title }}
    </h1>
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
  name: 'Collection-Details',
  middleware: ['store-selection'],
  mixins: [dynamicItem],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  // eslint-disable-next-line consistent-return
  async asyncData({
    params, store, $axios, error,
  }) {
    try {
      const storeID = store.state.store.id;
      const collectionId = params.id;
      const collection = $axios.get(`collections/${collectionId}`);
      const products = $axios.get(`products/${storeID}/${collectionId}`);
      const items = [collection, products];

      if (store.getters['cart/created']) {
        const cart = store.dispatch('cart/get');
        items.push(cart);
      }

      const results = await Promise.all(items);

      return {
        id: collectionId,
        collection: results[0].data.data,
        products: results[1].data.data,
        links: results[1].data.links,
      };
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style scoped>
</style>
