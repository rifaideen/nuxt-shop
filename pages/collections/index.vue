<template>
  <div>
    <template v-if="!$fetchState.pending">
      <!-- Carousel Slider: product details -->
      <CarouselItems
        :items="productSliders"
        id-attribute="product_id"
        base-url="product"
        has-actions
      />
      <!-- For Your Events: product listing -->
      <div class="container mb-2">
        <GridItemsRow
          title="For Your Events"
          :items="eventCollections"
          see-all-link="/collections"
          base-url="collections"
          :has-favourites="false"
        />
      </div>

      <!-- Our Collections: product listing -->
      <div class="container mb-2">
        <div class="row">
          <div class="col">
            <h2>Explore Our Packed Collections</h2>
          </div>
        </div>
        <div
          class="row p-4 product-container shadow rounded-lg mb-3"
          v-for="collection in ourCollections"
          :key="collection.id"
        >
          <div class="col-4">
            <img
              class="img-fluid"
              :src="collection.image"
              :alt="collection.title"
            />
          </div>
          <div class="col-8">
            <nuxt-link :to="`/collections/${collection.id}`">
              <div class="row mb-4">
                <div class="col-11">
                  <b>{{ collection.title }}</b>
                </div>
                <div class="col-1">
                  <span class="text-right">
                    <i class="fa fa-chevron-right"></i>
                  </span>
                </div>
              </div>
            </nuxt-link>
            <div class="row">
              <div class="col-12">
                <p>{{ collection.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="$fetchState.error">
      Oops! Something went wrong. Please try after sometimes.
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';

export default {
  middleware: ['store-selection'],
  computed: {
    ...mapGetters('collections', {
      productSliders: 'sliders',
      eventCollections: 'events',
      ourCollections: 'mixed',
    }),
  },
  async fetch() {
    const { id: storeId } = this.$store.state.store;
    const store = this.$store;

    if (!store.state.collections.isLoaded || store.state.collections.lastLoaded !== storeId) {
      await this.$store.dispatch('collections/getData', storeId);
    }
  },
};
</script>

<style scoped>
</style>
