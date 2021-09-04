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
            <CheckoutDeliveryComponent :is-gift-recipient="true" :location="giftRecipient" />
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
              v-model="notes"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded light-bg-container">
      <div class="row m-4 mt-4">
        <div class="col-12">
          <div class="form-group mt-2">
            <input type="checkbox" v-model="preferedDelivery" />
            <label class="orange-color">
              Do you have any preferred date and time for delivery.
            </label>
          </div>
        </div>
        <div class="col-12 mb-2" v-if="preferedDelivery">
          <div class="row">
            <div class="col-6">
              <b-form-datepicker
                id="example-datepicker"
                v-model="preferred_delivery_date"
                type="text"
                class="mb-2"
                placeholder="Date"
                :min="minDate"
              >
              </b-form-datepicker>
            </div>
            <div class="col-6">
              <select v-model="preferred_delivery_time" class="form-control">
                <option value="">Time</option>
                <option>9 AM to 12 PM</option>
                <option>12 PM to 3 PM</option>
                <option>3 PM to 6 PM</option>
                <option>6 PM to 9 PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Summary -->
    <OrderSummary />

    <!-- Review Order -->
    <ReviewOrder />

    <div class="fixed-bottom">
      <div class="row">
        <div class="col-10 offset-1 text-center">
          <button class="btn btn-block orange-bg text-uppercase" @click="checkout">
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CheckoutPage',
  layout: 'navigationOnly',
  middleware: ['authenticated', ({ store, redirect }) => {
    if (!store.getters['cart/hasItems']) {
      redirect('/basket');
    }
  }],
  async asyncData({ store }) {
    store.commit('setNavigationTitle', 'Checkout');
    await store.dispatch('cart/get');
    await store.dispatch('auth/getUser');

    return {
      cart: store.getters['cart/cart'],
      items: store.getters['cart/items'],
      preferedDelivery: false,
      preferred_delivery_date: null,
      preferred_delivery_time: '',
      notes: '',
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
    minDate() {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      return date;
    },
  },
  methods: {
    ...mapActions('cart', ['clearCart']),
    async checkout() {
      if (this.validate()) {
        // prepare payload
        const payload = {
          notes: this.notes,
          payment_info: "{ payment_ref: '#1234', status: 'success' }",
        };

        if (this.preferedDelivery) {
          payload.preferred_delivery_date = this.preferred_delivery_date;
          payload.preferred_delivery_time = this.preferred_delivery_time;
        }

        if (this.isGiftCheckout) {
          payload.gift_recipient_id = this.giftRecipient.id;
        } else {
          payload.delivery_location_id = this.deliveryLocation.id;
        }

        // call the payment gateway and hit the checkout api
        try {
          const { data } = await this.$axios.post(`/checkout/${this.cart.id}`, payload);

          if (data.success) {
            // clear cart and redirect to order success page.
            this.clearCart();
            this.$router.push('/order-placed');
          } else {
            this.$toast('danger', 'error', data.message);
          }
        } catch (error) {
          this.$toast('danger', 'error', error.message);
        }
      }
    },
    validate() {
      let hasError = false;
      let message = null;

      if (this.isGiftCheckout && !this.giftRecipient) {
        message = 'Please select gift recipient.';
        hasError = true;
      } else if (!this.isGiftCheckout && !this.deliveryLocation) {
        message = 'Please select delivery location.';
        hasError = true;
      }

      if (!hasError && this.preferedDelivery) {
        if (!this.preferred_delivery_date || !this.preferred_delivery_time) {
          message = 'Please fill preferred delivery date and time.';
          hasError = true;
        }
      }

      if (hasError) {
        this.$toast('danger', 'Error', message);
      }

      return !hasError;
    },
  },
};
</script>

<style scoped>
</style>
