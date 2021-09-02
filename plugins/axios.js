export default ({ $axios, store }) => {
  $axios.onRequest(() => {
    // Add auth header to all the requests if the user is logged in.
    if (store.getters['auth/isAuthenticated']) {
      $axios.setHeader('Authorization', `Bearer ${store.getters['auth/token']}`);
    }
  });
};
