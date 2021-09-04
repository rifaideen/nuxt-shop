<template>
  <div>
    <b-navbar type="dark" variant="light" fixed="bottom">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="d-flex m-auto text-center">
          <b-nav-item to="/">
            <b><i class="fa fa-fan fa-2x"></i><br/> Home</b>
          </b-nav-item>
          <b-nav-item to="/collections">
            <b><i class="fa fa-cookie-bite fa-2x"></i><br/> Collections</b>
          </b-nav-item>
          <b-nav-item to="/create-box">
            <b><i class="fa fa-box-open fa-2x"></i><br/> Create Box</b>
          </b-nav-item>
          <b-nav-item to="/event-request">
            <b><i class="fa fa-birthday-cake fa-2x"></i><br/> Events</b>
          </b-nav-item>
          <b-nav-item to="/basket">
            <b><i class="fa fa-shopping-basket fa-2x"></i><br/> Basket</b>
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
