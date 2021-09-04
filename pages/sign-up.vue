<template>
  <div class="mt-2">
    <h1 class="text-center">SIGN UP</h1>
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
          name="First Name"
          rules="required|min:3"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="firstName" />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Lats Name"
          rules="required|min:3"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="lastName" />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
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
          name="Mobile"
          rules="required|min:10|max:13"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Mobile Number</label>
            <input type="text" class="form-control" v-model="mobileNumber" />
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
              v-model="confirmPassword"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'navigationOnly',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      errors: null,
    };
  },
  asyncData({ store }) {
    store.commit('setNavigationTitle', null);
  },
  methods: {
    ...mapActions('auth', ['signup', 'authenticate']),
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          mobile_number: this.mobileNumber,
          password: this.password,
        };

        // pass the cart id, if any.
        if (this.$store.getters['cart/created']) {
          payload.cart_id = this.$store.getters['cart/id'];
        }

        const { data: user } = await this.signup(payload);
        // authenticate the user and redirect.
        this.authenticate({ user, token: user.token });
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
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
