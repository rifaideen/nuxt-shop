<template>
  <div class="mt-4">
    <ListLocation
      v-for="location in deliveryLocations"
      :location="location"
      :action="action"
      :key="location.id"
      :is-gift-recipient="true"
      @delete="onDelete"
      class="p-4"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const { data } = await $axios.get('/gift-recipients?expand=country');

    return {
      deliveryLocations: data.data,
      action: query?.a === 'select' ? 'select' : 'edit',
    };
  },
  methods: {
    async onDelete({ id }) {
      await this.$axios.delete(`/gift-recipient/${id}`);
      this.$nuxt.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
