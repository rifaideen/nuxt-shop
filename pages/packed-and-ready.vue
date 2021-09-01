<template>
  <div>
    <div class="row mt-2 mb-2">
      <div class="col">
        <p>Buy Our Elegantly Packed Boxes</p>
      </div>
    </div>

    <div
      class="row product-container shadow rounded-lg mb-3"
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
          <div class="row">
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

<script>
export default {
  name: 'Packed-Ready',
  middleware: ['store-selection'],
  layout: 'nav-only',
  head() {
    return {
      title: 'Packed & Ready Collections',
    };
  },
  async asyncData({ $axios, store }) {
    const storeId = store.state.store.id;
    const { data } = await $axios.get('/collections', { params: { store_id: storeId, type: 'mixed' } });
    store.commit('setNavigationTitle', 'Packed & Ready');

    return {
      collections: data.data,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
