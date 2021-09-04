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
              >Specify your location:</b
            >
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
                  v-model="name"
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
                  v-model="country"
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
            rules="required|min:10"
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
                  country="ae"
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
                :lat="lat || 25.276987"
                :long="lng || 55.316666"
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
                  v-model="additionalDetails"
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
  layout: 'navigationOnly',
  components: {
    ValidationObserver,
    ValidationProvider,
    AutoComplete: () => import(/* webpackChunkName: "auto-complete" */ 'vue-google-autocomplete'),
  },
  computed: {
    ...mapState(['countries']),
    action() {
      return this.$route.query?.a === 'select' ? 'select' : 'edit';
    },
  },
  data() {
    return {
      name: '',
      country: '',
      city: '',
      manualAddress: '',
      lat: '',
      lng: '',
      address: '',
      additionalDetails: '',
      errors: null,
      mapLoaded: false,
    };
  },
  async asyncData({ store }) {
    store.commit('setNavigationTitle', 'Add a new location');

    if (store.state.countries.length === 0) {
      await store.dispatch('getCountries');
    }
  },
  methods: {
    ...mapActions('auth', ['signup', 'authenticate']),
    async onFormValid() {
      try {
        // Prepare payload
        const payload = {
          country_id: this.country,
          name: this.name,
          address: this.address,
          city: this.city,
          latitude: this.latitude,
          longitude: this.longitude,
          additional_details: this.additionalDetails,
        };
        this.errors = null;

        const { data } = await this.$axios.post('/delivery-location?expand=country', payload);
        this.$store.commit('cart/setDeliveryLocation', data);
        this.$router.push(this.action === 'select' ? '/checkout' : '/delivery-locations');
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
      this.lat = lat;
      this.lng = long;

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
