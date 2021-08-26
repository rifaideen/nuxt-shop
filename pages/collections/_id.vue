<template>
  <div>
    Collection #{{ id }} Details Page (Products Listing)
  </div>
</template>

<script>
export default {
  middleware: ['store-selection'],
  asyncData({ params }) {
    return {
      id: params.id,
    };
  },
};
</script>

<style scoped>

</style>
