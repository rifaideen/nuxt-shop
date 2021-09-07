<template>
  <div class="mt-4">
    <div class="row light-bg-container mb-4 p-4">
      <div class="col-12 mb-2">
        <b class="orange-color">Tracking & Status:</b>
        <div class="mb-2">
          <sub>Please enter your order's number</sub>
        </div>
        <input type="text" class="form-control rounded" v-model="code">
      </div>
      <div class="col-12 mb-2">
        <button class="btn btn-lg btn-success" :disabled="code.length < 5" @click="trackOrder">
          <i class="fa fa-fingerprint"></i>
          Track Order
        </button>
      </div>
    </div>

    <div class="row light-bg-container mb-4 p-4" v-if="order">
      <div class="col-12 mb-2">
        <b class="orange-color">Details:</b>
      </div>
      <div class="col-12 mb-2">
        <b class="label">Order:</b>
        <b>{{ order.tracking_code }}</b>
      </div>
      <div class="col-12 mb-2">
        <b class="label">Status:</b>
        <b class="text-capitalize">{{ order.status }}</b>
      </div>
      <div class="col-12 mb-2">
        <b class="label">Order Date:</b>
        <b>{{ order.order_date }}</b>
      </div>
      <div class="col-12 mb-2">
        <b class="label">Delivery Expected:</b>
         <b>{{ order.expected_delivery || '-' }}</b>
      </div>
      <div class="col-12 mb-2">
        <b class="label">Delivery To:</b>
        <b>{{ order.location.address }}, {{ order.location.city }}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  middleware: ['store-selection'],
  data() {
    return {
      order: null,
      code: '',
    };
  },
  methods: {
    async trackOrder() {
      try {
        const { data } = await this.$axios.get(`/track-order/${this.code}`);
        this.order = data.data;
      } catch (error) {
        this.order = null;
        this.$toast('warning', 'Invalid Tracking Code', 'This tracking code is invalid');
      }
    },
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', 'Track Your Orders');
  },
};
</script>

<style scoped>
.light-bg-container b {
  color: #af9352;
}

.light-bg-container b.label {
  color: #564227;
}

.light-bg-container b.orange-color {
  color: #f85806;
}
</style>
