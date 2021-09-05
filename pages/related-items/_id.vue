<template>
  <div class="mt-4">
    <ListProduct
      :product="product"
      v-for="product in relatedProducts"
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
  middleware: ['store-selection'],
  layout: 'navigationOnly',
  mixins: [dynamicItem],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  async asyncData({
    $axios, params, store, error,
  }) {
    try {
      store.commit('setNavigationTitle', 'Related Items');
      const { data } = await $axios.get(`/product/${params.id}`, { params: { expand: 'images', } });

      return {
        relatedProducts: data.data.relatedProducts,
      };
    } catch (e) {
      if (e.isAxiosError) {
        return error({
          statusCode: e.response.status,
          message: e.response.statusText,
        });
      }

      return error({
        statusCode: 400,
        message: 'Oops! It looks like the requested product does not exists.',
      });
    }
  },
  computed: {
    favouriteClass() {
      return this.product.is_favourite ? 'is-favourite' : 'is-not-favourite';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
