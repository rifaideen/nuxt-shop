<template>
  <div>
    <div class="row m-2">
      <div class="col">
        Subtotal ({{ items.length }} Items)<br/>
        <b>{{ total }} {{ currency }}</b>
      </div>
      <div class="col text-right rounded">
        <button class="btn btn-lg" :class="giftBtnClass" @click="isGiftCheckout(!isGift)">
          <i class="fa fa-gift"></i> <br>
          Send As A Gift
        </button>
      </div>
    </div>
    <div class="row m-2 mb-4">
      <div class="col">
        <button class="btn btn-block orange-bg" @click="$router.push('/checkout')">
          <i class="fa fa-cart-plus"></i> Proceed To Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['total', 'currency', 'items'],
  computed: {
    ...mapState('cart', ['isGift']),
    giftBtnClass() {
      return this.isGift ? 'btn-primary' : 'golden-bg';
    },
  },
  methods: {
    ...mapMutations('cart', {
      isGiftCheckout: 'setIsGift',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
