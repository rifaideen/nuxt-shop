<template>
  <div class="row product-container mb-4">
    <div class="col-lg-3 col-sm-4">
      <img :src="item.image" :alt="item.title" class="rounded-lg img-fluid" />
    </div>
    <div class="col-lg-9 col-sm-8">
      <b>{{ item.title }}</b>
      <p>{{ item.description }}</p>
    </div>
    <div class="col-lg-4 offset-lg-8">
      <div class="row">
        <div class="col-6">
          <b>{{ item.quantity }} {{ item.unit }}</b>
        </div>
        <div class="col-6">
          <b>{{ item.price }} {{ currency }} </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
