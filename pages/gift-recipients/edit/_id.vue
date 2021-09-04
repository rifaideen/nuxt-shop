<template>
  <div>
    <gift-recipient-form :is-new="false" :location="location" :countries="countries" />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['countries']),
  },
  async asyncData({ params, $axios, store }) {
    const { data } = await $axios.get(`/gift-recipient/${params.id}?expand=country`);

    if (store.state.countries.length === 0) {
      await store.dispatch('getCountries');
    }

    return {
      location: data,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
