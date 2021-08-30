<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ShoppingCart />
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
export default {
  name: 'Basket-Page',
  middleware: ['store-selection'],
  data() {
    return {
      bestSellers: [],
    };
  },
  async fetch() {
    const { id: storeId } = this.$store.state.store;

    const { data } = await this.$axios.get(`/best-sellers/${storeId}`);
    this.bestSellers = data.data;
  },
};
</script>

<style lang="scss" scoped>
</style>
