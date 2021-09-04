<template>
  <div class="mt-4">
    <nuxt-link to="/gift-recipients/new">
      <button class="btn btn-danger btn-block text-uppercase mb-4">
        <i class="fa fa-plus-square"></i>
        Add A New Gift Recipient
      </button>
    </nuxt-link>
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
  layout: 'navigationOnly',
  middleware: ['authenticated'],
  async asyncData({ $axios, query, store }) {
    store.commit('setNavigationTitle', 'Gift Recipients');
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
