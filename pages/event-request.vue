<template>
  <div class="mt-4 light-bg-container rounded">
    <div class="p-4">
      <div v-if="errors">
        <b class="text-danger">Please clear the below errors:</b>
        <ul class="text-danger">
          <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
        </ul>
      </div>

      <ValidationObserver ref="validator" v-slot="{ passes }">
        <form novalidate @submit.prevent="passes(onFormValid)" ref="form">
          <div class="form-group row">
            <b class="col col-form-label orange-color"
              >Specify your event and we will contact you:</b
            >
          </div>
          <!-- event type -->
          <ValidationProvider
            name="Event Type"
            rules="required|min:5"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Type of Event:</label>
              <div class="col-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="event_type"
                  placeholder="Type of Event"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- attemdants -->
          <ValidationProvider
            name="Attendants"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Attendants:</label>
              <div class="col-10">
                <input
                  type="number"
                  class="form-control"
                  v-model="no_of_attendants"
                  placeholder="No of attendants"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- city -->
          <ValidationProvider
            name="City"
            rules="required|min:5"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">City:</label>
              <div class="col-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="city"
                  placeholder="City"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- location -->
          <ValidationProvider
            name="Location"
            rules="required|min:5"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Location:</label>
              <div class="col-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="location"
                  placeholder="Location"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- date -->
          <client-only>
            <ValidationProvider
              name="Date"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Date:</label>
                <div class="col-10">
                  <b-form-datepicker
                    v-model="duration_from"
                    type="text"
                    class="mb-2"
                    placeholder="Date"
                    :min="minDate"
                  >
                  </b-form-datepicker>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
          </client-only>

          <!-- budget -->
          <ValidationProvider
            name="Budget"
            rules="required|min:3"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Budget:</label>
              <div class="col-10">
                <input
                  type="number"
                  class="form-control"
                  v-model="budget"
                  placeholder="Budget"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- email -->
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Email:</label>
              <div class="col-10">
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Email"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- contact -->
          <div class="form-group row">
            <label class="col-2 col-form-label">Contact:</label>
            <div class="col-10">
              <div class="input-group">
                <div class="input-group-prepend">
                  <ValidationProvider
                    name="Country Code"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      v-model="country_code"
                    >
                      <option
                        v-for="country in countries"
                        :key="country.id"
                        :value="country.country_code"
                      >
                        {{ country.country_code }}
                      </option>
                    </select>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <ValidationProvider
                  name="Mobile"
                  rules="required|min:9"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="form-control"
                    v-model="contact_no"
                    placeholder="Mobile Number"
                  />
                  <div class="invalid-feedback d-lg-none">{{ errors[0] }}</div>
                  <div
                    class="invalid-feedback d-none d-lg-block"
                    style="margin-left: -90px"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>

          <!-- privacy -->
          <ValidationProvider
            name="Infomation is correct"
            rules="confirmation_required"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-1 checkbox text-center col-form-label">
                <input type="checkbox" v-model="is_correct">
              </label>
              <div class="col-11">
                The information mentioned above is correct.
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <!-- terms -->
          <ValidationProvider
            name="Terms & Conditions"
            rules="confirmation_required"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-1 checkbox text-center col-form-label">
                <input type="checkbox" v-model="accept_terms">
              </label>
              <div class="col-11">
                I Accept <a href="https://" target="_blank" rel="noopener noreferrer">Tems & Conditions.</a>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>

          <div class="row">
            <div class="col text-right">
              <button type="submit" class="btn orange-bg">
                <i class="fa fa-plus-circle"></i> Place Request
              </button>
            </div>
            <div class="col-1"></div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions, mapState } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapState(['countries', 'store']),
    minDate() {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      return date;
    },
  },
  async asyncData({ store }) {
    await store.dispatch('getCountries');
    const code = store.state.countries[0]?.country_code;

    return {
      country_code: code ? code : '',
    }
  },
  data() {
    return {
      event_type: '',
      no_of_attendants: '',
      city: '',
      location: '',
      duration_from: null,
      budget: '',
      email: '',
      contact_no: '',
      is_correct: false,
      accept_terms: false,
      errors: null,
    };
  },
  methods: {
    ...mapActions(['getCountries']),
    async onFormValid() {
      const { country_code } = this;
      const [country] = this.countries.filter(c => c.country_code === country_code);
      try {
        // Prepare payload
        const payload = Object.assign({
          store_id: this.store.id,
          country_id: country.id,
        }, {
          ...this.$data
        });
        // re-format the duration from
        const [y, m, d] = payload.duration_from.split('-');
        payload.duration_from = `${d}-${m}-${y}`;
        // clear unwanted fields from the payload
        delete payload.accept_terms;
        delete payload.errors;
        delete payload.is_correct;
        this.errors = null;
        await this.$axios.post('/event-request', payload);
        this.$toast('success', 'Success', 'The event request placed successfully.');
      } catch (error) {
        // handle server validation error
        if (error.isAxiosError && error.response.status === 400 && error.response.data.errors) {
          this.errors = error.response.data.errors;
          this.$toast('danger', 'Info', 'The event request failed with validation errors');
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
.checkbox {
  margin-top: -8px;
}
</style>
