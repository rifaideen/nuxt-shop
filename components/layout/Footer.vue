<template>
  <footer class="mt-5">
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      const date = new Date();

      return date.getFullYear();
    },
  },
};
</script>
<style scoped>
footer {
  padding-top: 20px;
  min-height: 100px;
  color: grey;
}
</style>
