<template>
  <div>
    <product-carousel :products="sliders" :has-actions="true" id-attribute="product_id" />

    <!-- Best Sellers -->
    <div class="container mb-2">
      <div class="row">
        <div class="col">
          <h2>Our Best Sellers</h2>
        </div>
        <div class="col text-right">
          <nuxt-link to="/best-sellers"> See All </nuxt-link>
        </div>
      </div>
      <div class="row">
        <div
          class="col-4"
          v-for="bestSeller in bestSellers"
          :key="bestSeller.id"
        >
          <nuxt-link :to="`/product/${bestSeller.id}`">
            <b-card class="best-seller" :img-src="bestSeller.image">
              <b-card-title>
                <div class="row">
                  <div class="col-10">{{ bestSeller.title }}</div>
                  <div class="col-2 text-success">
                    <i class="fa fa-star"></i> &nbsp;
                  </div>
                </div>
              </b-card-title>
            </b-card>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Seasonal Collection -->
    <div class="container mb-2">
      <div class="row">
        <div class="col">
          <h2>Season's Collection</h2>
        </div>
      </div>
      <collection-carousel :collections="seasonalCollections" />
    </div>

    <!-- Explore our packed collections -->
    <div class="container">
      <div class="row">
        <div class="col">
          <h2>Explore Our Packed Collections</h2>
        </div>
        <div class="col text-right">
          <nuxt-link to="/ready-boxes"> See All </nuxt-link>
        </div>
      </div>
      <div class="row">
        <div
          class="col-4"
          v-for="box in readyBoxes"
          :key="box.collection_id"
        >
          <nuxt-link :to="`/collections/${box.collection_id}`">
            <b-card class="best-seller" :img-src="box.image">
              <b-card-title>
                <div class="row">
                  <div class="col-10">{{ box.title }}</div>
                  <div class="col-2 text-success">
                    <i class="fa fa-star"></i> &nbsp;
                  </div>
                </div>
              </b-card-title>
            </b-card>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapState } from 'vuex';

export default {
  middleware: 'store-selection',
  layout: 'home',
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
