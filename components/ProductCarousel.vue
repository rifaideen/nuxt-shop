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
      v-for="(item, index) in items" :key="index"
      :img-src="item[imageKeyAttribute]"
      style="height: 500px"
    >
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
    imageKeyAttribute: {
      type: String,
      default: 'image',
    },
  },
};
</script>

<style scoped>
</style>
