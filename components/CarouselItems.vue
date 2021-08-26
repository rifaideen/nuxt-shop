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
      v-for="item in items" :key="item[idAttribute]"
      :img-src="item.image"
      style="height: 500px"
    >
      <div class="row" v-if="hasActions">
        <div class="col text-left">
          <nuxt-link :to="`/${baseUrl}/${item[idAttribute]}`">
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
    items: {
      type: Array,
      required: true,
    },
    baseUrl: {
      type: String,
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
