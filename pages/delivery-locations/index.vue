<template>
  <div class="mt-4">
    <nuxt-link to="/delivery-locations/new">
      <button class="btn btn-danger btn-block text-uppercase mb-4">
        <i class="fa fa-plus-square"></i>
        Add A New Location
      </button>
    </nuxt-link>
    <ListLocation
      v-for="location in deliveryLocations"
      :location="location"
      :action="action"
      :key="location.id"
      @delete="onDelete"
      class="p-4"
    />
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  async asyncData({ $axios, query, store }) {
    store.commit('setNavigationTitle', 'Delivery Locations');
    const { data } = await $axios.get('/delivery-locations?expand=country');

    return {
      deliveryLocations: data.data,
      action: query?.a === 'select' ? 'select' : 'edit',
    };
  },
  methods: {
    async onDelete({ id }) {
      await this.$axios.delete(`/delivery-location/${id}`);
      this.$nuxt.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
