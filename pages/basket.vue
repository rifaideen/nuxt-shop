<template>
  <div>
    <div v-if="!$fetchState.pending">
      <template v-if="cart">
        <Cart :items="items" :cart="cart" />
      </template>

      <div class="mt-3 mb-2">
        <b>All Times Best Selling</b>
      </div>
      <ListProducts :products="bestSellers" />
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
import { mapGetters, mapActions } from 'vuex';

export default {
  middleware: ['store-selection'],
  computed: {
    ...mapGetters('cart', ['created', 'cart', 'items']),
  },
  data() {
    return {
      bestSellers: [],
    };
  },
  methods: {
    ...mapActions('cart', ['get']),
  },
  async fetch() {
    const { id: storeId } = this.$store.state.store;

    const { data } = await this.$axios.get(`/best-sellers/${storeId}`);
    this.bestSellers = data.data;

    // cart created?
    if (this.created) {
      await this.get();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
