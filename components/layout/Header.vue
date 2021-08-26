<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-button
        v-b-toggle.sidebar-1
        class="navbar-toggler-custom collapsed btn btn-dark"
      >
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-navbar-brand to="/">
        <!-- Ghraoui Chocolates -->
        <img src="logo.webp" alt="Logo" />
      </b-navbar-brand>
    </b-navbar>

    <!-- Side Menu -->
    <b-sidebar
      id="sidebar-1"
      no-header
      bg-variant="dark"
      backdrop
      backdrop-variant="light"
      text-variant="light"
      shadow
    >
      <template #default>
        <div class="row brand-sidebar-container">
          <div class="offset-3 col align-items-center mt-2">
            <img src="logo.webp" alt="" />
          </div>
        </div>
        <div class="px-3 py-2 brand-sidebar-menu">
          <!-- Menu 1 -->
          <div class="row mb-5">
            <div class="col-12 mb-2">
              <i class="fa fa-shopping-basket"></i> Basket
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-history"></i>
              Order History
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-truck"></i>
              Track Your Orders
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-clock"></i>
              Saved Items
            </div>
          </div>

          <!-- Menu 2 -->
          <div class="row mb-5">
            <div class="col-12 mb-2">
              <i class="fa fa-globe-asia"></i> Delivery Locations
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-gifts"></i>
              Gift Recipients
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-user-circle"></i>
              Account
            </div>
          </div>

          <!-- Menu 3 -->
          <div class="row mb-2">
            <div class="col-12 mb-2">
              <i class="fa fa-flag"></i> Country
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-street-view"></i>
              City
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-language"></i>
              Language
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="d-flex align-items-center px-3 py-2 brand-sidebar-footer">
          Icons
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BNavbar, BNavbarBrand,
} from 'bootstrap-vue';

export default {
  components: {
    BNavbar,
    BNavbarBrand,
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
</style>
