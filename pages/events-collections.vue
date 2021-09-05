<template>
  <div class="mt-2">
    <!-- Our Collections: product listing -->
      <div class="container mb-2">
        <div class="row">
          <div class="col mb-2">
            <b>Plan Your Happiest Occasions</b>
          </div>
        </div>
        <div
          class="row p-4 product-container shadow rounded-lg mb-3"
          v-for="collection in collections"
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
  </div>
</template>

<script>
export default {
  name: 'Collection-Details',
  middleware: ['store-selection'],
  layout: 'navigationOnly',
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  // eslint-disable-next-line consistent-return
  async asyncData({
    store, $axios, error,
  }) {
    try {
      const storeID = store.state.store.id;
      const { data } = await $axios.get('/collections', {
        params: {
          store_id: storeID,
          type: 'event',
        },
      });
      store.commit('setNavigationTitle', 'Events Collections');

      return {
        collections: data.data,
      };
    } catch (e) {
      return error(e);
    }
  },
};
</script>

<style scoped>
</style>
