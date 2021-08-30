<template>
  <div class="fixed-bottom cart-controls">
    <div class="container">
      <div class="row" v-if="!$fetchState.pending">
        <div class="col-6 offset-6">
          <div class="row mt-2 mb-2">
            <div class="col-12 text-left">
              <b>
                {{ product.price }} {{ product.currency }} / {{ product.unit }}
              </b>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-sm golden-bg"
                    @click="decreaseQuantity"
                  >
                    <i class="fa fa-minus-circle"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="quantity"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-sm golden-bg rounded-right"
                    @click="increaseQuantity"
                  >
                    <i class="fa fa-plus-circle"></i>
                  </button>
                  <div class="col text-left mt-1 rounded-0">
                    <b>{{ product.unit }}</b>
                  </div>
                </div>
                <button class="btn golden-bg" v-if="!isNew" @click="removeFromCart">
                  <i class="fa fa-trash-alt"></i> Remove
                </button>
              </div>
            </div>
          </div>
          <div class="row mb-2 mt-2">
            <div class="col-6">
              <b>
                Total:
                <span class="orange-color">
                  {{ total }} {{ product.currency }}
                </span>
              </b>
            </div>
            <div class="col text-right">
              <button class="btn btn-primary orange-bg" @click="addToCart">
                <i class="fa fa-plus-circle"></i> {{ isNew ? 'Add to Basket' : 'Update Basket' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-6 offset-6">
          <i class="fa fa-spinner fa-spin"></i> Loading
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['product'],
  data() {
    return {
      quantity: 1,
      isNew: true,
    };
  },
  methods: {
    ...mapActions('cart', ['create', 'add', 'viewItem', 'removeItem']),
    // find if the given route is active route
    active(route) {
      return this.activeRoute === route;
    },
    increaseQuantity() {
      const { unit_slug: unit } = this.product;
      const isKg = (['kg', 'kilogram'].indexOf(unit) > -1);
      let quantity = 0;

      if (this.quantity < 1) {
        quantity = isKg ? 0.1 : 1;
      } else {
        quantity = isKg ? 0.5 : 1;
      }

      this.quantity = parseFloat(Number(parseFloat(this.quantity) + quantity).toFixed(1));
    },
    decreaseQuantity() {
      const { unit_slug: unit } = this.product;
      const isKg = (['kg', 'kilogram'].indexOf(unit) > -1);
      let quantity = 0;

      if (this.quantity <= 1 && this.quantity > 0) {
        quantity = isKg ? 0.1 : 1;
      } else if (this.quantity > 1) {
        quantity = isKg ? 0.5 : 1;
      }

      this.quantity = parseFloat(Number(parseFloat(this.quantity) - quantity).toFixed(1));
    },
    async addToCart() {
      if (this.quantity <= 0) {
        this.$toast('warning', 'Note', 'Please select the desired quantity');
        return;
      }

      try {
        if (!this.cartCreated) {
          await this.create();
        }

        const { data } = await this.add({
          product_id: this.product.id,
          quantity: this.quantity,
        });

        if (data.success) {
          this.isNew = false;
          this.$toast('success', 'Success', data.message);
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
    async removeFromCart() {
      try {
        if (!this.isNew) {
          const { data } = await this.removeItem(this.product.id);

          // reset item status
          if (data && data.success) {
            this.isNew = true;
            this.quantity = 1;
            this.$toast('success', 'Success', data.message);
          } else {
            this.$toast('danger', 'Note', 'Unbale to remove item');
          }
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
  },
  computed: {
    ...mapGetters(
      {
        cartId: 'cart/id',
        cartCreated: 'cart/created',
      },
    ),
    total() {
      return (this.product.price * this.quantity).toFixed(2);
    },
  },
  async fetch() {
    if (!this.cartCreated) {
      return;
    }

    const { data } = await this.viewItem(this.product.id);

    if (data) {
      this.quantity = data.quantity;
      this.isNew = false;
    }
  },
};
</script>

<style scoped>
.cart-controls {
  background: #efe9dd;
}
</style>
