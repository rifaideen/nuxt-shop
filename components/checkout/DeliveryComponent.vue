<template>
  <div class="row delivery-location mt-2">
    <div class="col-12 mb-2"><b>Title:</b> {{ location.name }}</div>
    <div class="col-12 mb-2">
      <b>Country:</b> {{ location.country.name }}
    </div>
    <div class="col-12 mb-2"><b>City:</b> {{ location.city }}</div>
    <div class="col-12 mb-2"><b>Mobile:</b> {{ location.name }}</div>
    <div class="col-12"><b>Address:</b> {{ location.address }}</div>
  </div>
</template>

<script>
export default {
  props: ['location'],
};
</script>

<style lang="scss" scoped>
</style>
