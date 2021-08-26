<template>
  <b-carousel
    id="carousel-1"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333"
  >
    <!-- Slides with custom text -->
    <b-carousel-slide
      :img-src="product.image"
      v-for="product in products"
      :key="product.product_id"
      style="height: 500px"
    >
      <div class="row" v-if="hasActions">
        <div class="col text-left">
          <nuxt-link :to="`/product/${product[idAttribute]}`">
            <button class="btn btn-danger">Buy Now</button>
          </nuxt-link>
        </div>
      </div>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    idAttribute: {
      type: String,
      default: 'id',
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>
