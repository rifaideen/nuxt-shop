<template>
  <div>
    <div class="row m-4" v-if="items && items.length === 0">
      <div class="col text-center">
        <b>Your Basket is empty!</b>
        <div class="m-4">
          <img src="/logo.webp" alt="" />
        </div>
        <nuxt-link to="/best-sellers">
          <button class="btn golden-bg">Start Order</button>
        </nuxt-link>
      </div>
    </div>
    <template v-else>
      <div class="row mb-2 mt-4" v-for="item in items" :key="item.id">
        <div class="col-lg-10 product-container col-sm-12 shadow-lg rounded">
          <CartItem
            :item="item"
            :currency="cart.currency"
            @item-updated="refreshCart"
            @item-deleted="refreshCart"
            @item-saved-for-later="refreshCart"
          />
        </div>
      </div>

      <div class="row mb-2 mt-4">
        <div class="col-lg-10 product-container col-sm-12 shadow-lg rounded">
          <CartCheckout
            :items="items"
            :total="cart.total_amount"
            :currency="cart.currency"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['created', 'cart', 'items']),
  },
  methods: {
    ...mapActions('cart', ['get', 'create']),
    async refreshCart() {
      // cart created?
      if (!this.created) {
        await this.create();
      }

      await this.get();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
