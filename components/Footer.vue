<template>
  <footer>
    <div class="container">
      <div class="row mb-2 p-2">
        <div class="col-lg-6">
          Get In Touch
          <div class="row">
            <div class="col-12">
              <nuxt-link to="/">Home</nuxt-link>
            </div>
            <div class="col-12">
              <nuxt-link to="/about">About</nuxt-link>
              </div>
            <div class="col-12">
              <nuxt-link to="/contact">Contact</nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          Our Collections
          <div class="row">
            <div class="col-12">
              <!-- <nuxt-link to="/films">Films</nuxt-link> -->
            </div>
            <div class="col-12">
              <!-- <nuxt-link to="/genres">Genres</nuxt-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">&copy; {{ year }} Ghraoui Chocolates</div>
      </div>
    </div>
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
  min-height: 200px;
  color: grey;
}
</style>
