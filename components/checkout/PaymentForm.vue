<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="row mb-4">
        <div class="col-lg-4 col-sm-6">
          <h4 class=" orange-color">
            Enter Card Details:
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col-6 mt-2">
          <div class="form-group">
            <div id="payment-form"></div>
          </div>
        </div>
        <div class="col-6 text-center">
          <button
            type="submit"
            class="btn btn-outline-danger"
            :disabled="submitting">Submit Payment
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-sm-12 offset-lg-4 text-danger">
          {{ error }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';

export default {
  head() {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/v3/',
          callback: () => this.init(),
        },
      ],
    };
  },
  props: {
    clientSecret: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      $stripe: null,
      error: null,
      card: null,
      submitting: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    init() {
      try {
        // eslint-disable-next-line no-undef
        this.$stripe = Stripe(this.$config.stripePublishableKey);

        if (this.$stripe) {
          const elements = this.$stripe.elements();
          const card = elements.create('card', {
            style: {
              base: {
                iconColor: '#c4f0ff',
                color: '#141414',
                fontWeight: '500',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                  color: '#141414',
                },
                '::placeholder': {
                  color: '#f85806',
                  fontWeight: 'bold',
                },
              },
              invalid: {
                iconColor: '#f85806',
                color: '#f85806',
              },
            },
          });
          // Add an instance of the card Element into the `card-element` <div>
          card.mount('#payment-form');
          // set the card reference to access later.
          this.card = card;

          // card validation
          const vm = this;
          card.on('change', (event) => {
            if (event.error) {
              vm.error = event.error.message;
            } else {
              vm.error = '';
            }
          });
        }
      } catch (error) {
        this.$toast('danger', 'Payment Initialization Error', error.message);
      }
    },
    async onSubmit() {
      try {
        this.submitting = true;
        const result = await this.$stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: `${this.user.first_name} ${this.user.last_name}`.trim(),
            },
          },
        });

        if (result.error) {
          this.error = result.error.message;
          this.submitting = false;
        } else if (result.paymentIntent.status === 'succeeded') {
          this.$emit('payment-success', result.paymentIntent);
        }
      } catch (error) {
        this.$toast('error', 'Payment Error', 'Unable to complete the payment. Make sure the card details are correct.');
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
