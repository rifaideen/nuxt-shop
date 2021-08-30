<template>
  <div>
    <div class="row mb-2 mt-4" v-for="item in items" :key="item.id">
      <div
        class="
          col-lg-10
          product-container
          col-sm-12
          shadow-lg
          rounded
        "
      >
        <CartItem :item="item" />
      </div>
    </div>

    <div class="row mb-2 mt-4">
      <div
        class="
          col-lg-10
          product-container
          col-sm-12
          shadow-lg
          rounded
        "
      >
        <CartCheckout :items="items" :total="cart.total_amount" :currency="cart.currency" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cart', 'items'],
};
</script>

<style lang="scss" scoped>
</style>
