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
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label>Email</label>
            <input type="email" disabled class="form-control" v-model="email" />
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
  middleware: ['authenticated'],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      errors: null,
    };
  },
  async asyncData({ store, $axios, error: $error }) {
    try {
      store.commit('setNavigationTitle', 'Edit Profile');
      const { data: user } = await $axios.get('/profile', {
        params: {
          fields: 'first_name,last_name,email,mobile',
        },
      });

      return {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        mobileNumber: user.mobile,
      };
    } catch (error) {
      // handle server validation error
      if (error.isAxiosError && error.response.status === 400 && error.response.data.errors) {
        this.errors = error.response.data.errors;
      } else {
        $error(error);
      }
    }
  },
  methods: {
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          mobile_number: this.mobileNumber,
        };

        const { data } = await this.$axios.put('/profile', payload);

        if (data.success) {
          this.$refs.validator.reset();
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
