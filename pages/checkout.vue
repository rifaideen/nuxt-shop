<template>
  <div>
    <div class="rounded light-bg-container">
      <div class="row m-4 mt-4">
        <div class="col-12 mt-4">
          <template v-if="!isGiftCheckout && deliveryLocation">
            <b class="orange-color">Delivery To:</b>
            <CheckoutDeliveryComponent :location="deliveryLocation" />
          </template>
          <template v-if="isGiftCheckout && giftRecipient">
            <b class="orange-color">Recipient Details:</b>
            <CheckoutDeliveryComponent :location="giftRecipient" />
          </template>
        </div>
        <div class="col-12 mb-4">
          <button
            class="btn btn-block golden-bg text-uppercase"
            @click="$router.push(addressLinks.select)"
          >
            {{ selectAddress }}
          </button>
        </div>
        <div class="col-12 mb-4">
          <button
            class="btn btn-block orange-bg text-uppercase"
            @click="$router.push(addressLinks.new)"
          >
            <i class="fa fa-plus-square"></i>
            {{ addAddress }}
          </button>
        </div>
      </div>
    </div>

    <div class="rounded light-bg-container">
      <div class="row m-4 mt-4">
        <div class="col">
          <div class="form-group mt-2">
            <label class="orange-color">Enter Your Personal Message</label>
            <textarea
              class="form-control rounded"
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="Write your personalized wish here"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded light-bg-container">
      <div class="row m-4 mt-4">
        <div class="col-12">
          <div class="form-group mt-2">
            <input type="checkbox" name="" id="" />
            <label class="orange-color">
              Do you have any preferred date and time for delivery.
            </label>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="row">
            <div class="col-6">Date</div>
            <div class="col-6">Time</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded light-bg-container order-summary">
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
          <div class="col-6 text-right">
            {{ item.price }} {{ cart.currency }}
          </div>
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
            <b class="orange-color">{{ cart.total_amount }} {{ cart.currency }}</b>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">Delivery To: #402, ABC XYZ</div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom">
      <div class="row">
        <div class="col-10 offset-1 text-center">
          <button class="btn btn-block orange-bg text-uppercase">
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

export default {
  name: 'CheckoutPage',
  layout: 'nav-only',
  middleware({ store, redirect }) {
    if (!store.getters['cart/hasItems']) {
      redirect('/basket');
    }
  },
  async asyncData({ store }) {
    store.commit('setNavigationTitle', 'Checkout');
    await store.dispatch('cart/get');

    return {
      cart: store.getters['cart/cart'],
      items: store.getters['cart/items'],
    };
  },
  computed: {
    ...mapState('cart', ['deliveryLocation', 'giftRecipient']),
    isGiftCheckout() {
      return this.$store.state.cart.isGift;
    },
    selectAddress() {
      return !this.isGiftCheckout ? 'Select Location' : 'Select Recipient';
    },
    addAddress() {
      return !this.isGiftCheckout ? 'Add A New Location' : 'Add A New Gift Recipient';
    },
    addressLinks() {
      if (!this.isGiftCheckout) {
        return {
          select: '/delivery-locations?a=select',
          new: '/delivery-locations/new?a=select',
        };
      }

      return {
        select: '/gift-recipients?a=select',
        new: '/gift-recipients/new?a=select',
      };
    },
  },
};
</script>

<style scoped>
</style>
