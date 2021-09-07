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
      <GridItemsRow
        title="Our Best Sellers"
        :items="bestSellers"
        see-all-link="/best-sellers"
        base-url="product"
      />
    </div>

    <!-- Recent Orders -->
    <div class="container mt-2" v-if="isAuthenticated && recentOrders">
      <GridItemsRow
        title="Your Recently Ordered"
        :items="recentOrders"
        see-all-link="/recent-orders"
        base-url="product"
        id-attribute="product_id"
        :has-favourites="false"
      />
    </div>

    <!-- Your Favorites -->
    <div class="container mt-2" v-if="isAuthenticated && favorites && favorites.length > 0">
      <GridItemsRow
        title="Your Favorites"
        :items="favorites"
        see-all-link="/orders"
        base-url="product"
        id-attribute="product_id"
        title-attribute="name"
        :has-thumbnail-object="true"
        image-attribute="thumbnail"
      >
      <template v-slot:favourite="{ item }">
        <button class="btn is-favourite" @click="removeFavourite(item.product_id)">
          <i class="fa fa-star"></i>
        </button>
      </template>
      </GridItemsRow>
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
        base-url="collections"
        has-actions
      />
    </div>

    <!-- Explore our packed collections -->
    <div class="container">
      <GridItemsRow
        title="Explore Our Packed Collections"
        :items="readyBoxes"
        see-all-link="/packed-and-ready"
        id-attribute="collection_id"
        base-url="product"
        :has-favourites="false"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapState } from 'vuex';

export default {
  middleware: 'store-selection',
  computed: {
    ...mapState(['store']),
    ...mapGetters('home', [
      'sliders', 'bestSellers',
      'seasonalCollections', 'readyBoxes',
      'recentOrders', 'favorites',
    ]),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    async removeFavourite(id) {
      await this.$axios.delete(`/remove-favourite/${id}`);
      await this.$store.dispatch('home/getData', this.store.id);
    },
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
