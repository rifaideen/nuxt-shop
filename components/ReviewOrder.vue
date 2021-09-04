<template>
  <div class="rounded light-bg-container order-summary">
    <div class="p-4">
      <div class="row mb-2">
        <div class="col">
          <h4 class="orange-color">Review Your Order:</h4>
        </div>
      </div>
      <div v-for="(item, index) in items" :key="`item-${item.id}`">
        <CheckoutItem :item="item" :currency="cart.currency" />
        <hr v-if="index + 1 < items.length" />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';

export default {
  // props: ['items', 'cart'],
  computed: {
    ...mapGetters('cart', ['cart', 'items']),
  },
};
</script>

<style lang="scss" scoped>
</style>
