<template>
  <div class="mt-4">
    <ListDeliveryLocation
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
  async asyncData({ $axios, query }) {
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
