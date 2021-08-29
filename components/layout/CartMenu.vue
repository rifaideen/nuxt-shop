<template>
  <div class="fixed-bottom cart-controls">
    <div class="container">
      <div class="row">
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
                  <button class="btn btn-sm btn-primary" @click="decreaseQuantity">
                    <i class="fa fa-minus-circle"></i>
                  </button>
                </div>
                <input type="text" class="form-control" disabled :value="quantity" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-primary rounded-right" @click="increaseQuantity">
                    <i class="fa fa-plus-circle"></i>
                  </button>
                  <div class="col text-left rounded-0">
                    <b>{{ product.unit }}</b>
                  </div>
                </div>
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
                <i class="fa fa-plus-circle"></i> Add to Basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    // find if the given route is active route
    active(route) {
      return this.activeRoute === route;
    },
    increaseQuantity() {
      const { unit_slug: unit } = this.product;
      const isKg = (['kg', 'kilogram'].indexOf(unit) > -1);
      console.log({unit, isKg});
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
    addToCart() {
      if (this.quantity <= 0) {
        alert('Please select the desired quantity');
      } else {
        alert('Added to cart successfully.');
      }
    },
  },
  computed: {
    total() {
      return (this.product.price * this.quantity).toFixed(2);
    },
  },
  props: ['product'],
};
</script>

<style scoped>
.cart-controls {
  background: #efe9dd;
}
</style>
