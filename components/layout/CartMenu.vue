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
                  <button class="btn btn-sm btn-primary">
                    <i class="fa fa-minus-circle"></i>
                  </button>
                </div>
                <input type="text" class="form-control" value="1.0" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-primary rounded-right">
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
                {{ product.price }} {{ product.currency }}</span
              >
              </b>
            </div>
            <div class="col text-right">
              <button class="btn btn-primary orange-bg">
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
  methods: {
    // find if the given route is active route
    active(route) {
      return this.activeRoute === route;
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
