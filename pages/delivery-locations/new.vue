<template>
<div>
  <delivery-location-form :countries="countries" />
</div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

export default {
  layout: 'navigationOnly',
  computed: {
    ...mapState(['countries']),
  },
  async asyncData({ store }) {
    store.commit('setNavigationTitle', 'Add a new location');

    if (store.state.countries.length === 0) {
      await store.dispatch('getCountries');
    }
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
