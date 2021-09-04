<template>
  <div class="">
    <div class="">
      <div v-if="errors">
        <b class="text-danger">Please clear the below errors:</b>
        <ul class="text-danger">
          <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
        </ul>
      </div>

      <ValidationObserver ref="validator" v-slot="{ passes }">
        <form novalidate @submit.prevent="passes(onFormValid)" ref="form" class="mt-4">
          <div class="light-bg-container rounded mb-4 p-4">
            <div class="form-group row">
              <b class="col col-form-label orange-color">Recipient Details:</b>
            </div>
            <ValidationProvider
              name="Name"
              rules="required|min:3"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Name:</label>
                <div class="col-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="full_name"
                    placeholder="Name"
                  />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group row">
              <label class="col-2 col-form-label">Mobile:</label>
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
                      v-model="mobile_number"
                      placeholder="Mobile Number"
                    />
                    <div class="invalid-feedback d-lg-none">{{ errors[0] }}</div>
                    <div class="invalid-feedback d-none d-lg-block" style="margin-left:-90px;">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
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
          </div>
          <div class="light-bg-container rounded p-4">
            <div class="form-group row">
              <b class="col col-form-label orange-color">Specify your location:</b>
            </div>
            <ValidationProvider
              name="Location Type"
              rules="required|min:3"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Location Type:</label>
                <div class="col-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="location_name"
                    placeholder="Home, Work ..."
                  />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="Country"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Country:</label>
                <div class="col-10">
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    v-model="country_id"
                  >
                    <option value="">Select Country</option>
                    <option
                      v-for="country in countries"
                      :key="country.id"
                      :value="country.id"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="City"
              rules="required|min:3"
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
            <ValidationProvider
              name="Mark on Map"
              rules=""
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Mark on Map:</label>
                <div class="col-10">
                  <input type="hidden" :value="manualAddress" />
                  <auto-complete
                    id="address-autocomplete"
                    class="form-control"
                    placeholder="Specify the location"
                    :country="['ae', 'qa']"
                    :types="null"
                    @placechanged="onAddressUpdated"
                    @change="onAddressChanged"
                    v-if="mapLoaded"
                  >
                  </auto-complete>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>

            <div class="form-group row">
              <div class="col-10 offset-2">
                <google-maps
                  @map-updated="onMapUpdated"
                  @map-loaded="mapLoaded = true"
                  :lat="latitude || 25.276987"
                  :long="longitude || 55.316666"
                  id="map-container"
                />
              </div>
            </div>
            <ValidationProvider
              name="Address"
              rules="required|min:3"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Address:</label>
                <div class="col-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="address"
                    placeholder="Street / Building / Apartment"
                  />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="Extra Details"
              rules="string"
              v-slot="{ errors }"
            >
              <div class="form-group row">
                <label class="col-2 col-form-label">Extra Details:</label>
                <div class="col-10">
                  <textarea
                    cols="30"
                    rows="3"
                    class="form-control"
                    v-model="additional_details"
                    placeholder="Landmark, nearby places ..."
                  ></textarea>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </div>
              </div>
            </ValidationProvider>
            <div class="row">
              <div class="offset-2 col-lg-2 col-sm-6">
                <button
                  type="button"
                  class="btn btn-block golden-bg"
                  @click="$router.go(-1)"
                >
                  Cancel
                </button>
              </div>
              <div class="col-lg-2 col-sm-6">
                <button type="submit" class="btn btn-block orange-bg">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'navigationOnly',
  components: {
    ValidationObserver,
    ValidationProvider,
    AutoComplete: () => import(/* webpackChunkName: "auto-complete" */ 'vue-google-autocomplete'),
  },
  computed: {
    action() {
      return this.$route.query?.a === 'select' ? 'select' : 'edit';
    },
  },
  props: {
    countries: [],
    location: {
      type: Object,
      default: () => ({
        full_name: '',
        email: '',
        mobile_number: '',
        location_name: '',
        country_code: '',
        country: null,
        city: '',
        latitude: '',
        longitude: '',
        address: '',
        additional_details: '',
      })
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const code = this.countries[0]?.country_code;

    return {
      ...this.location,
      country_id: this.location.country ? this.location.country.id : '',
      country_code: (this.location.country_code == '' && code) ? code : this.location.country_code,
      manualAddress: '',
      errors: null,
      mapLoaded: false,
    };
  },
  methods: {
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          country_id: this.country_id,
          full_name: this.full_name,
          mobile_number: this.mobile_number,
          country_code: this.country_code,
          email: this.email,
          address: this.address,
          location_name: this.location_name,
          additional_details: this.additional_details,
          city: this.city,
          latitude: String(this.latitude),
          longitude: String(this.longitude),
        };
        this.errors = null;
        let response = null;

        if (this.isNew) {
          response = await this.$axios.post('/gift-recipient?expand=country', payload);
        } else {
          response = await this.$axios.put(`/gift-recipient/${this.location.id}?expand=country`, payload);
        }

        this.$store.commit('cart/setGiftRecipient', response.data);
        this.$router.push(this.action === 'select' ? '/checkout' : '/gift-recipients');
      } catch (error) {
        // handle server validation error
        if (error.isAxiosError && error.response.status === 400 && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.$nuxt.error(error);
        }
      }
    },
    // eslint-disable-next-line camelcase
    onAddressUpdated({ latitude, longitude, locality }, { address_components }) {
      // when the google returns any valid result.
      let area = '';

      // eslint-disable-next-line camelcase
      if (typeof address_components === 'object') {
        // eslint-disable-next-line camelcase
        address_components.forEach((address_component) => {
          if (address_component.types.includes('sublocality')) {
            area = address_component.long_name;
          }
        });
      }

      const payload = {
        city: locality,
        area,
        address: document.getElementById('address-autocomplete').value,
        lat: latitude,
        long: longitude,
      };

      this.onMapUpdated(payload);
    },
    onAddressChanged(value) {
      this.manualAddress = value;
    },
    onMapUpdated({
      address, area, city, lat, long,
    }) {
      // user interacted with map reset the address autocomplete input.
      document.getElementById('address-autocomplete').value = `${area}, ${address}`;
      this.latitude = lat;
      this.longitude = long;

      if (city) {
        this.city = city;
      }

      if (address) {
        this.address = address;
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
