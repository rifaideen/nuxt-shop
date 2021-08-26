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
      :img-src="collection.image"
      v-for="collection in collections"
      :key="collection.collection_id"
      style="height: 500px"
    >
      <div class="row">
        <div class="col text-left">
          <nuxt-link :to="`/collection/${collection.collection_id}`">
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
    collections: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
