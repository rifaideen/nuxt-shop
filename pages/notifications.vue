<template>
  <div>
    <div v-if="!$fetchState.pending">
      <div class="mt-4">
        <div
          class="row p-2 rounded notification-container mb-2"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="col-12 mb-2">
            <b>{{ notification.title }}</b>
          </div>
          <div class="col-12">
            <p>{{ notification.description }}</p>
          </div>
        </div>

        <div class="row" v-if="notifications.length === 0">
          <div class="col">
            No Results Found
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <i class="fa fa-spinner fa-spin"></i> Loading
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  data() {
    return {
      notifications: [],
      links: false,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', 'Notifications');
  },
  async fetch() {
    const { data } = await this.$axios.get('/notifications');
    this.notifications = data.data;
    this.links = data.links;
  },
};
</script>

<style scoped>
</style>
