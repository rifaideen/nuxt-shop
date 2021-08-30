<template>
  <div>
    <div class="row m-2">
      <div class="col">
        Subtotal ({{ items.length }} Items)<br/>
        <b>{{ total }} {{ currency }}</b>
      </div>
      <div class="col rounded">
        <button class="btn btn-lg golden-bg">
          <i class="fa fa-gift"></i> <br>
          Send As A Gift
        </button>
      </div>
    </div>
    <div class="row m-2 mb-4">
      <div class="col">
        <button class="btn btn-block orange-bg">
          <i class="fa fa-cart-plus"></i> Proceed To Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total', 'currency', 'items'],
};
</script>

<style lang="scss" scoped>
</style>
