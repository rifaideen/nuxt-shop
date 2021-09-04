<template>
  <div class="row text-center mt-4">
    <div class="col">
      <h3 class="mb-2">Your Order Is Placed</h3>
      <p>You'll now receive confirmation on your email and mobile number.</p>
      <p>
        <i class="fa fa-fan fa-5x orange-color"></i>
      </p>
      <button class="btn golden-bg" @click="$router.push('/')">
        Back To Home
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  middleware: ['authenticated'],
  asyncData({ store }) {
    store.commit('setNavigationTitle', 'Order Placed');
  },
};
</script>

<style lang="scss" scoped>

</style>
