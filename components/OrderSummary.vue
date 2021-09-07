<template>
  <div class="rounded light-bg-container order-summary mb-4" v-if="cart">
    <div class="p-4">
      <div class="row mb-2">
        <div class="col-6">
          <h4 class="orange-color">Order Summary:</h4>
        </div>
        <div class="col-6 text-right">
          <sub><i>Price Inclusive of taxes</i></sub>
        </div>
      </div>
      <!-- Products List -->
      <div class="row mb-2" v-for="item in items" :key="item.id">
        <div class="col-6">{{ item.name }}</div>
        <div class="col-6 text-right">{{ item.price }} {{ cart.currency }}</div>
      </div>
      <hr />

      <!-- Pricing Summary -->
      <div class="row text-info">
        <div class="col-6">
          <b>Subtotal:</b>
        </div>
        <div class="col-6 text-right">
          <b>{{ cart.gross_total }} {{ cart.currency }}</b>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">VAT {{ cart.tax_percentage }}%</div>
        <div class="col-6 text-right">
          {{ cart.tax_amount }} {{ cart.currency }}
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">Delivery Charge</div>
        <div class="col-6 text-right">
          {{ cart.delivery_charge }} {{ cart.currency }}
        </div>
      </div>
      <hr />

      <!-- Charge and delivery location  -->
      <div class="row">
        <div class="col-6">
          <b>Total:</b>
        </div>
        <div class="col-6 text-right">
          <b class="orange-color"
            >{{ cart.total_amount }} {{ cart.currency }}</b
          >
        </div>
      </div>
      <hr />

      <div class="row mt-2">
        <div class="col-lg-3">Delivery To:</div>
        <div class="col-lg-9 text-lg-right">{{ address || '(not set)' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('cart', ['isGift', 'deliveryLocation', 'giftRecipient']),
    ...mapGetters('cart', ['cart', 'items']),
    address() {
      let address = false;

      if (this.isGift && this.giftRecipient) {
        address = this.giftRecipient.address;
      } else if (!this.isGift && this.deliveryLocation) {
        address = this.deliveryLocation.address;
      }

      return address;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
