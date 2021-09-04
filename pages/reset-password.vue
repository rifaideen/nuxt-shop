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
          name="Token"
          rules="required"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Token</label>
            <input
              type="text"
              placeholder="Enter Token"
              class="form-control"
              v-model="token"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Password"
          rules="required|string|min:8"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              class="form-control"
              v-model="password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Confirm Password"
          rules="required|confirmed:Password"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Confirm password"
              v-model="confirmPassword"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <div class="row">
          <div class="col-2">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions, mapMutations } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'navigationOnly',
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
      token: '',
      password: '',
      confirmPassword: '',
      errors: null,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', null);
  },
  methods: {
    ...mapActions('auth', ['pullMessage']),
    ...mapMutations('auth', ['setMessage']),
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          password: this.password,
        };

        const { data } = await this.$axios.post(`/reset-password/${this.token}`, payload);

        if (data.success) {
          this.setMessage({
            variant: 'success',
            title: 'Success',
            description: data.message,
          });
          this.$nuxt.context.redirect('/login');
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
  async mounted() {
    const message = await this.pullMessage();

    if (message) {
      this.$toast(message.variant, message.title, message.description);
    }
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
