<template>
  <div>
    <b-navbar type="dark" variant="light" fixed="bottom">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="d-flex m-auto text-center">
          <b-nav-item to="/">
            <b><i class="fa fa-fan fa-1x"></i> Home</b>
          </b-nav-item>
          <b-nav-item to="/collections">
            <b><i class="fa fa-cookie fa-1x"></i> Collections</b>
          </b-nav-item>
          <b-nav-item to="/create-box">
            <b><i class="fa fa-box fa-1x"></i> Create Box</b>
          </b-nav-item>
          <b-nav-item to="/event-request">
            <b><i class="fa fa-box-open fa-1x"></i> Events</b>
          </b-nav-item>
          <b-nav-item to="/basket">
            <b><i class="fa fa-shopping-basket fa-1x"></i> Basket</b>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
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
