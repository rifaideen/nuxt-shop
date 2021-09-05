<template>
  <span class="favourite-container" :class="className" @click="toggle">
    <i class="fa fa-star"></i>
  </span>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  props: {
    isFavourite: {
      required: true,
    },
    productId: {
      required: true,
    },
  },
  data() {
    return {
      favourite: this.isFavourite,
    };
  },
  computed: {
    className() {
      return this.favourite ? 'is-favourite' : 'is-not-favourite';
    },
  },
  methods: {
    // eslint-disable-next-line func-names
    toggle: debounce(async function () {
      try {
        if (!this.$store.getters['auth/isAuthenticated']) {
          this.$toast('danger', 'Error', 'Please login to perform this action');
          return;
        }

        let response = null;

        if (this.favourite) {
        // remove
          response = await this.$axios.delete(`/remove-favourite/${this.productId}`);
        } else {
        // add
          response = await this.$axios.post(`/add-favourite/${this.productId}`);
        }

        const { data } = response;

        if (data.success) {
          this.$toast('success', 'Success', data.message);
          this.favourite = !this.favourite;
        } else {
          this.$toast('danger', 'Error', data.message);
        }
      } catch (e) {
        if (e.isAxiosError) {
          this.$nuxt.error({
            statusCode: e.response.status,
            message: e.response.statusText,
          });
        } else {
          this.$nuxt.error(e);
        }
      }
    }, 1000),
  },
};
</script>

<style scoped>
.favourite-container {
  cursor: pointer;
}
</style>
