<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Ghraoui Chocolates</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/store-selection">Store Selection</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem,
} from 'bootstrap-vue';

export default {
  components: {
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavItem,
  },
  computed: {
    // current active route name
    activeRoute() {
      return this.$route.name;
    },
  },
  methods: {
    // find if the given route is active route
    active(route) {
      return this.activeRoute === route;
    },
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #141414 !important;
}
.nuxt-link-exact-active {
  color: goldenrod !important;
}
</style>
