<template>
  <div class="mt-2">
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
        autocomplete="off"
      >
        <ValidationProvider
          name="Password"
          rules="required|string|min:8"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              v-model="existingPassword"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="New Password"
          rules="required|string|min:8"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              class="form-control"
              v-model="password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Confirm Password"
          rules="required|confirmed:New Password"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <div class="row">
          <div class="col-lg-2 col-sm-6">
            <button
              type="button"
              class="btn btn-block golden-bg"
              @click="$router.go(-1)"
            >
              Cancel
            </button>
          </div>
          <div class="col-lg-2 col-sm-6">
            <button type="submit" class="btn btn-block orange-bg">Save</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'navigationOnly',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      existingPassword: '',
      password: '',
      confirmPassword: '',
      errors: null,
    };
  },
  async asyncData({ store }) {
    store.commit('setNavigationTitle', 'Change Password');
  },
  methods: {
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          existing_password: this.existingPassword,
          password: this.password,
          password_repeat: this.confirmPassword,
        };

        const { data } = await this.$axios.post('/update-password', payload);

        if (data.success) {
          this.$refs.validator.reset();
          this.existingPassword = '';
          this.password = '';
          this.confirmPassword = '';

          this.$toast('success', 'Success', data.message);
          const router = this.$router;
          setTimeout(() => {
            router.back();
          }, 2000);
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
