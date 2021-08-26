<template>
  <div>
    <CarouselItems
      :items="sliders"
      has-actions
      id-attribute="product_id"
      base-url="product"
    />

    <!-- Best Sellers -->
    <div class="container mt-2">
      <GridProductRow
        title="Our Best Sellers"
        :products="bestSellers"
        see-all-link="/best-sellers"
      />
    </div>

    <!-- Seasonal Collection -->
    <div class="container mb-2">
      <div class="row">
        <div class="col">
          <h2>Season's Collection</h2>
        </div>
      </div>
      <CarouselItems
        :items="seasonalCollections"
        id-attribute="collection_id"
        base-url="products"
        has-actions
      />
    </div>

    <!-- Explore our packed collections -->
    <div class="container">
      <GridProductRow
        title="Explore Our Packed Collections"
        :products="readyBoxes"
        see-all-link="/ready-boxes"
        id-attribute="collection_id"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapState } from 'vuex';

export default {
  middleware: 'store-selection',
  // layout: 'home',
  computed: {
    ...mapState(['store']),
    ...mapGetters('home', ['sliders', 'bestSellers', 'seasonalCollections', 'readyBoxes']),
  },
  async asyncData({ store }) {
    const storeId = store.state.store.id;

    if (!store.state.home.isLoaded || store.state.home.lastLoaded !== storeId) {
      await store.dispatch('home/getData', store.state.store.id);
    }
  },
};
</script>

<style scoped>
.best-seller {
  color: #141414 !important;
}
</style>
