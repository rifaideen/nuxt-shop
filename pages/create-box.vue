<template>
  <div>
    <div v-if="$fetchState.pending">
      <i class="fa fa-spinner fa-spin"></i> Loading
    </div>
    <div v-else-if="$fetchState.error">
      Oops! Something Went Error.
    </div>
    <div v-else>
      <CarouselItems
        :items="sliders"
        has-actions
        id-attribute="product_id"
        base-url="product"
      />
      <!-- Form -->
      <CreateBoxForm />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['store-selection'],
  data() {
    return {
      sliders: [],
    };
  },
  async fetch() {
    const storeID = this.$store.state.store.id;
    const { data } = await this.$axios.get(`/sliders/${storeID}`);
    this.sliders = data.data.sliders;

    // This page requires cart information.
    if (!this.$store.getters['cart/created']) {
      await this.$store.dispatch('cart/create');
    }

    await this.$store.dispatch('cart/get');
  },
};
</script>

<style lang="scss" scoped>
</style>
