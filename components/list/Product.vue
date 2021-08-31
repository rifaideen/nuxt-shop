<template>
  <div class="row product-container shadow mb-4">
    <div class="col-12 text-success text-right">
      <i class="fa fa-star"></i>
    </div>
    <div class="col-lg-3 col-sm-4">
      <img
        :src="product.image"
        :alt="product.title"
        class="rounded-lg img-fluid"
      />
    </div>
    <div class="col-lg-9 col-sm-8">
      <nuxt-link :to="`/product/${product.id}`">
        <b>{{ product.title }}</b>
      </nuxt-link>
      <p>{{ product.description }}</p>
    </div>
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-lg-9 col-sm-12" :class="{ 'text-info': item }">
          <b>
            {{ product.price }} {{ product.currency }} / {{ product.unit }}
          </b>
        </div>
        <div class="col-lg-3 text-center col-sm-12">
          <button
            class="btn btn-primary add-to-cart-btn"
            v-if="!item"

            @click="$emit('add-to-basket', product)"
          >
            <i class="fa fa-plus-circle"></i> Add to Basket
          </button>
          <div v-else>
            <div class="input-group">
              <div class="input-group-prepend">
                <button class="btn btn-sm golden-bg" @click="$emit('decrease-quantity', item)">
                  <i class="fa fa-minus-circle"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control text-center"
                disabled
                :value="itemQuantity + ' ' + item.unit"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-sm golden-bg rounded-right"
                  @click="$emit('increase-quantity', item)"
                >
                  <i class="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['store-selection'],
  data() {
    // get the cart item for the current product. If any.
    const item = this.$store.getters['cart/getItemByProductId'](this.product.id);

    return {
      item,
      quantity: item ? item.quantity : 1,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemQuantity() {
      return this.item ? this.item.quantity : 1;
    },
  },
  methods: {
    refresh() {
      // set updated item
      this.$nextTick(function () {
        this.item = this.$store.getters['cart/getItemByProductId'](this.product.id);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
