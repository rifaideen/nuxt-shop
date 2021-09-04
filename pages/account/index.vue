<template>
  <div class="container">
    <div class="row account-menu shadow rounded mt-4 mb-2">
      <div class="col-lg-5 col-sm-12">
        <nuxt-link to="/account/edit-profile">
          <div class="row">
            <div class="col-lg-8 col-sm-10">Edit Profile</div>
            <div class="col">
              <span class="ml-3"><i class="fa fa-chevron-right"></i></span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="row account-menu shadow rounded mb-2">
      <div class="col-lg-5 col-sm-12">
        <nuxt-link to="/account/change-password">
          <div class="row">
            <div class="col-lg-8 col-sm-10">Change Password</div>
            <div class="col">
              <span class="ml-3"><i class="fa fa-chevron-right"></i></span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  middleware: ['store-selection'],
  asyncData({ store }) {
    store.commit('setNavigationTitle', 'Account');
  },
};
</script>

<style scoped>
.account-menu {
  height: 50px;
  padding: 15px;
  background: #efe9dd;
}

.account-menu a {
  color: #564227;
}
</style>
