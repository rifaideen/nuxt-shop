<template>
  <div class="mt-2">
    <h1 class="text-center">LOG IN</h1>
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
            <input type="email" class="form-control" v-model="email" />
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
            <input type="password" class="form-control" v-model="password" />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <div class="row">
          <div class="col-2">
            <button type="submit" class="btn btn-primary">Log in</button>
          </div>
          <div class="col-3 text-center">
            <nuxt-link to="forgot-password">
              Forgot Password?
            </nuxt-link>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <div style="height:350px"></div>
    <div class="row">
        <div class="col text-center">
          <nuxt-link to="/sign-up">Sign Up</nuxt-link>
        </div>
      </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions } from 'vuex';
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
      email: '',
      password: '',
      errors: null,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', null);
  },
  methods: {
    ...mapActions('auth', ['authenticate', 'login', 'pullMessage']),
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          email: this.email,
          password: this.password,
        };

        // pass the cart id, if any.
        if (this.$store.getters['cart/created']) {
          payload.cart_id = this.$store.getters['cart/id'];
        }

        const { data } = await this.login(payload);
        // authenticate the user and redirect.
        this.authenticate({ user: data.data, token: data.data.token });
        this.$refs.validator.reset();
        this.$nuxt.context.redirect('/');
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
