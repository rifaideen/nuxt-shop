<template>
  <div>
    <div v-if="!$fetchState.pending">
      <Cart :items="items" :cart="cart" />
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapActions } from 'vuex';

export default {
  middleware: ['store-selection'],
  computed: {
    ...mapGetters('cart', ['created', 'cart', 'items']),
  },
  methods: {
    ...mapActions('cart', ['get']),
  },
  async fetch() {
    // cart created and items are not fetched already?
    if (this.created && this.items.length === 0) {
      await this.get();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
