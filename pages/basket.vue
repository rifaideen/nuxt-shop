<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ShoppingCart />
      <div class="mt-3 mb-2">
        <b>All Times Best Selling</b>
      </div>
      <ListProduct
        :product="product"
        v-for="product in bestSellers"
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
    <div class="row m-2" v-else>
      <div class="col text-center">
        <i class="fa fa-spinner fa-spin"></i> Loading
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapMutations } from 'vuex';
import dynamicItem from '~/mixins/dynamic-item';

export default {
  name: 'Basket-Page',
  middleware: ['store-selection'],
  mixins: [dynamicItem],
  computed: {
    ...mapGetters('cart', {
      bestSellers: 'bestSellers',
    }),
  },
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  async fetch() {
    if (!this.$store.getters['cart/created']) {
      await this.$store.dispatch('cart/create');
    }

    await this.$store.dispatch('cart/get');
    await this.$store.dispatch('cart/getBestSellers');
  },
  methods: {
    ...mapMutations('cart', ['setBestSellers']),
    // override mixin
    async onItemUpdated() {
      // Reset selected item, refresh cart and update best sellers.
      this.selectedItem = null;
      this.$bvModal.hide('cart-controls');
      // get updated cart details
      await this.$store.dispatch('cart/get');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
