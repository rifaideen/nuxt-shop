<template>
  <div class="mt-2">
    <h1 class="text-center">RESET PASSWORD</h1>
    <div v-if="errors">
      <b class="text-danger">Please clear the below errors:</b>
      <ul class="text-danger">
        <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
      </ul>
    </div>

    <ValidationObserver ref="validator" v-slot="{ passes }">
      <form
        novalidate
        @submit.prevent="passes(onFormValid)"
        ref="form"
        class="mt-4"
      >
        <ValidationProvider
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your e-mail address"
              class="form-control"
              v-model="email"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <div class="row">
          <div class="col-2">
            <button type="submit" class="btn btn-primary">Next</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapMutations } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'nav-only',
  middleware({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
      redirect('/');
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: '',
      errors: null,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', null);
  },
  methods: {
    ...mapMutations('auth', ['setMessage']),
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          email: this.email,
        };

        const { data } = await this.$axios.post('/request-reset-password', payload);

        if (data.success) {
          this.setMessage({
            variant: 'success',
            title: 'Success',
            description: data.message,
          });
          this.$router.push('/reset-password');
        } else {
          this.$toast('error', 'Error', data.message);
        }
      } catch (error) {
        // handle server validation error
        if (error.isAxiosError && error.response.status === 400 && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.$nuxt.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
