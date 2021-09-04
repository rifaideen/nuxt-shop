<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light" fixed="top">
      <b-button
        v-b-toggle.sidebar-1
        class="navbar-toggler-custom collapsed btn btn-dark"
      >
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-navbar-brand to="/">
        <!-- Ghraoui Chocolates -->
        <img src="/logo.webp" alt="Logo" />
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item to="/notifications">
              <b><i class="fa fa-bell fa-1x"></i></b>
            </b-nav-item>
            <b-nav-item to="/search">
              <b><i class="fa fa-search fa-1x"></i></b>
            </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="min-height-container"></div>

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
            <img src="/logo.webp" alt="" />
          </div>
        </div>
        <div class="px-3 py-2 brand-sidebar-menu">
          <!-- Menu 1 -->
          <div class="row mb-5">
            <div class="col-12 mb-2">
              <nuxt-link to="/basket">
                <i class="fa fa-shopping-basket"></i> Basket
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <nuxt-link to="/orders">
                <i class="fa fa-history"></i> Order History
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <nuxt-link to="/track-orders">
                <i class="fa fa-truck"></i> Track Your Orders
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <nuxt-link to="/saved-items">
                <i class="fa fa-clock"></i> Saved Items
              </nuxt-link>
            </div>
          </div>

          <!-- Menu 2 -->
          <div class="row mb-5" v-if="isAuthenticated">
            <div class="col-12 mb-2">
              <nuxt-link to="/delivery-locations">
                <i class="fa fa-globe-asia"></i> Delivery Locations
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <nuxt-link to="/gift-recipients">
                <i class="fa fa-gifts"></i> Gift Recipients
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <nuxt-link to="/account">
                <i class="fa fa-user-circle"></i>
                Account
              </nuxt-link>
            </div>
          </div>

          <!-- Menu 3 -->
          <div class="row mb-3">
            <div class="col-12 mb-2">
              <nuxt-link to="/store-selection">
                <i class="fa fa-flag"></i> Select Store
              </nuxt-link>
            </div>
            <div class="col-12 mb-2">
              <i class="fa fa-language"></i>
              Language
            </div>
          </div>

          <!-- Menu 4 -->
          <div class="row mb-3">
            <div class="col-12 mb-2">
              <nuxt-link to="/our-boutiques">
                <i class="fa fa-store"></i> Our Boutiques
              </nuxt-link>
            </div>
          </div>

          <!-- Menu 5 -->
          <div class="row mb-2">
            <div class="col-12 mb-2" v-if="!isAuthenticated">
              <nuxt-link to="/sign-up">
                <i class="fa fa-edit"></i> Sign Up
              </nuxt-link>
            </div>
            <div class="col-12 mb-2" v-if="!isAuthenticated">
              <nuxt-link to="/login">
                <i class="fa fa-sign-in-alt"></i>
                Login
              </nuxt-link>
            </div>
            <div class="col-12 mb-2" v-else>
              <button class="btn golden-color btn-logout" @click="logoutUser">
                <i class="fa fa-sign-in-alt"></i>
                Logut
              </button>
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
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapActions } from 'vuex';
import {
  BNavbar, BNavbarBrand,
} from 'bootstrap-vue';

export default {
  components: {
    BNavbar,
    BNavbarBrand,
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    // current active route name
    activeRoute() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('auth', ['logout', 'forget']),
    // find if the given route is active route
    active(route) {
      return this.activeRoute === route;
    },
    async logoutUser() {
      try {
        // send logout request and forget the user upon sucessfull call.
        const { data } = await this.logout();

        if (data.success) {
          this.$toast('success', 'Success', data.message);
        } else {
          this.$toast('error', 'Error', data.message);
        }
        this.forget();
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #141414 !important;
}
.min-height-container {
  min-height: 100px;
}
</style>
