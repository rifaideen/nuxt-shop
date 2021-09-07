<template>
  <div class="mt-4">
      <div class="row order-summary rounded mb-4">
        <div class="col">
          Status: <b>{{ order.order.status }}</b>
        </div>
        <div class="col text-lg-right">
          Date: <b>{{ date(order.order.order_date) }}</b>
        </div>
      </div>
      <div
        class="row order-history rounded mb-4 pt-1"
        v-for="product in order.orderDetails"
        :key="product.id"
      >
        <div class="col-lg-3 col-sm-4">
          <img
            :src="product.image"
            :alt="product.title"
            class="rounded-lg img-fluid"
          />
        </div>
        <div class="col-lg-9 col-sm-8 mt-5">
          <div class="row mb-2">
            <div class="col-12 mb-2">
              <b class="title">{{ product.name }}</b>
            </div>
            <div class="col-12 mb-2">
              Quantity: <b>{{ product.quantity }} {{ product.unit }}</b>
            </div>
            <div class="col-12 mb-2">
              Price: <b>{{ product.price }} {{ order.order.currency }}</b>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  middleware: ['authenticated'],
  async asyncData({
    $axios, store, params, error,
  }) {
    try {
      const { data } = await $axios.get(`/order/${params.id}`);
      store.commit('setNavigationTitle', `Order #${data.data.order.tracking_code}`);

      return {
        order: data.data,
      };
    } catch (e) {
      if (e.isAxiosError) {
        return error({
          statusCode: e.response.status,
          message: e.response.statusText,
        });
      }

      return error({
        statusCode: 400,
        message: 'Oops! It looks like the requested order does not exists.',
      });
    }
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
