<template>
  <div class="row delivery-location mt-2">
    <div class="col-12 mb-2">
      <b>Title:</b>
      {{ isGiftRecipient ? location.full_name : location.name }}
    </div>
    <div class="col-12 mb-2">
      <b>Country:</b> {{ location.country.name }}
    </div>
    <div class="col-12 mb-2"><b>City:</b> {{ location.city }}</div>
    <div class="col-12 mb-2">
      <b>Mobile:</b>
      {{ isGiftRecipient ? location.mobile_number : user.mobile }}
    </div>
    <div class="col-12"><b>Address:</b> {{ location.address }}</div>
  </div>
</template>

<script>
export default {
  props: ['location', 'isGiftRecipient'],
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
