<template>
  <content-placeholders>
    <div class="row mb-2" v-for="i in rows" :key="i">
      <div class="col-3">
        <content-placeholders-img />
      </div>
      <div class="col">
        <content-placeholders-text />
      </div>
    </div>
  </content-placeholders>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style scoped>
</style>
