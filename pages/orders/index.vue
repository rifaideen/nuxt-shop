<template>
  <div class="mt-4">
    <div
      class="order-history rounded mb-4 p-4"
      v-for="order in orders"
      :key="order.id"
      @click="$router.push(`/orders/${order.id}`)"
    >
      <div class="row mb-2">
        <div class="col">
          Order #: <b class="text-info">{{ order.tracking_code }}</b>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          Status: <b class="text-capitalize">{{ order.status }}</b>
        </div>
        <div class="col-6">
          Date: <b class="text-capitalize">{{ date(order.order_date) }}</b>
        </div>
      </div>
    </div>
    <div v-if="!orders" class="min-vh-100">
      No orders yet.
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  async asyncData({ $axios, store }) {
    store.commit('setNavigationTitle', 'Order History');
    const { data } = await $axios.get('/orders');

    return {
      orders: data.data,
    };
  },
  methods: {
    date(value) {
      const date = new Date(value * 1000);

      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    },
  },
};
</script>

<style scoped>

</style>
