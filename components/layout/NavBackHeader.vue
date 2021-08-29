<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light" fixed="top">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="$goBack">
            <b><i class="fa fa-chevron-left fa-2x"></i></b>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-brand to="/">
        <!-- Ghraoui Chocolates -->
        <img src="/logo.webp" alt="Logo" />
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item to="/basket">
              <b><i class="fa fa-shopping-basket fa-1x"></i></b>
            </b-nav-item>
            <b-nav-item to="/search">
              <b><i class="fa fa-search fa-1x"></i></b>
            </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="min-height-container"></div>
  </div>
</template>

<script>
import {
  BNavbar, BNavbarBrand,
} from 'bootstrap-vue';

export default {
  name: 'Nav-Back-Header',
  components: {
    BNavbar,
    BNavbarBrand,
  },
};
</script>

<style scoped>
.min-height-container {
  min-height: 100px;
}
</style>
